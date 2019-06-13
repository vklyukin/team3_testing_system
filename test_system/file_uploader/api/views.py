import fulltext
import re
import xlrd
import os
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import FileSerializer
from test_question.models import TestQuestion
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from django.db.models import Q
from django.shortcuts import render
from test_text.models import ReadingTest
from .permissions import IsTeacherOrAdmin, IsStudentOrNotAuth, EmptyPermission
from user_major.models import UserMajor, Major
from accounts.api.serializers import UserSerializer
from evaluation.models import Mark
from django.conf import settings
from stud_id.models import UserStudentID
from test_system import base_path


questions = []


class TextUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return [IsStudentOrNotAuth()]
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [IsTeacherOrAdmin()]

    def post(self, request, *args, **kwargs):
        # I'll refactor this later
        global questions
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():

            fi = file_serializer.save()
            fi.file.open(mode='rb')
            with fi.file:

                pattern_line = r"[A-Za-z- _’'\"”’‘,.?!()0-9]+"
                pattern_headline = r"\(\d+\)" + pattern_line
                pattern_answer = r"([a-d]\))" + pattern_line

                test, reading = load_test(fi.file)
                questions = []

                test = iter(test.split("\n"))
                try:
                    line = next(test).strip()
                    while True:
                        if re.match(pattern_headline, line):
                            questions.append(Question(line))

                            line = next(test).strip()
                            if not re.match(pattern_answer, line):
                                questions[-1].text += " " + line
                            else:
                                continue
                        elif re.match(pattern_answer, line):
                            questions[-1].answers.append(line)
                            line = next(test).strip()
                            if not (re.match(pattern_answer, line) or
                                    re.match(pattern_headline, line)):
                                questions[-1].answers[-1] += " " + line
                            else:
                                continue
                        line = next(test).strip()

                except Exception as ex:
                    pass

                for i in range(20, 25):
                    questions[i].is_reading = True

                reading = reading.replace('Read the text below. For questions 21 to 25, choose the best answer (a, b,', '')
                reading = reading.replace('c or d).', '')

                ReadingTest.objects.create(
                    text=''.join(map(lambda x: '<p>' + x.replace("\n", " ") + '.</p>',
                                     re.compile('[\.!?]\n').split(reading))).replace("<p> .</p>", "").replace(
                        "<p>.</p>", ""),
                )

            return Response({"status": "OK"}, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class KeysUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return [IsStudentOrNotAuth()]
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [IsStudentOrNotAuth()]

    def post(self, request, *args, **kwargs):
        global questions
        if questions == []:
            return Response({"status": "Keys can not be pasted before questions."}, status=status.HTTP_400_BAD_REQUEST)

        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            fi = file_serializer.save()
            fi.file.open(mode='rb')
            with fi.file:
                answers = fulltext.get(fi.file)
                for line in answers.split('\n'):
                    if re.match(r'\(\d+\) [a-d]', line):
                        questions[
                            int(re.findall(r'\d+', line)[0]) - 1
                            ].answ_correct = re.findall(r'[a-d]', line)[0]
            TestQuestion.objects.all().delete()
            for question in questions:
                TestQuestion.objects.create(
                    number=question.number,
                    text=question.text,
                    answ_correct=question.answ_corr(),
                    answ_option1=question.answers[0],
                    answ_option2=question.answers[1],
                    answ_option3=question.answers[2],
                    answ_option4=question.answers[3],
                    is_reading=question.is_reading,
                )

            return HttpResponseRedirect(base_path.BASE_PATH + 'test_editor/')
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileUserCreate(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.request.user.is_authenticated:
            pref = UserPreferences.objects.filter(user=self.request.user)
            if pref[0].user_preference == Preference.STUDENT:
                return [EmptyPermission()]
            elif pref[0].user_preference == Preference.ADMIN or pref[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        else:
            return [EmptyPermission()]

    def post(self, request, *args, **kwargs):
        form = FileSerializer(data=request.data)
        if form.is_valid():
            input = form.save()
            path = os.path.join(settings.MEDIA_ROOT, str(input.file))
            workbook = xlrd.open_workbook(filename=path)
            sheet = workbook.sheet_by_index(0)
            if sheet.nrows < 2:
                return Response({'message': 'There is no users in file'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                for i in range(2, sheet.nrows):
                    student_id = sheet.cell(i, 0).value
                    last_name = sheet.cell(i, 1).value
                    first_name = sheet.cell(i, 2).value
                    major_string = sheet.cell(i, 4).value
                    email = sheet.cell(i, 6).value
                    if major_string.lower().strip() == 'программная инженерия':
                        major = Major.SE.name
                    else:
                        major = Major.AMI.name
                    username = email.split("@")[0].strip()
                    data = {
                        'username': username,
                        'first_name': first_name,
                        'last_name': last_name,
                        'email': email,
                        'password': student_id,
                    }
                    serialized = UserSerializer(data=data)
                    if serialized.is_valid():
                        user = serialized.save()
                        response = serialized.data
                        UserPreferences.objects.create(
                            user=user,
                            user_preference=Preference.STUDENT.name
                        )
                        UserMajor.objects.create(
                            user=user,
                            user_major=major
                        )
                        Mark.objects.create(user=user, first_name=user.first_name,
                                            second_name=user.last_name,
                                            major=major)
                        UserStudentID.objects.create(user=user, student_id=student_id)
                        del response['password']
                        del response['first_name']
                        del response['last_name']
                return Response({"status": "OK"}, status=status.HTTP_201_CREATED)


class Question():
    def __init__(self, headline=""):

        if headline[0] == " ":
            headline = headline[1:]

        self.number = re.findall(r"\d+", headline)[0]

        self.text = headline[headline.find(' ') + 1:]

        self.answers = []
        self.answ_correct = ""
        self.is_reading = False

    def __str__(self):
        res = f"({self.number}) {self.text}\n"
        for i in self.answers:
            if i[0] == self.answ_correct:
                res += "[x] "
            else:
                res += "[ ] "
            res += i + '\n'
        return res

    def __repr__(self):
        return self.__str__()

    def answ_corr(self):
        if self.answ_correct == 'a':
            return 0
        if self.answ_correct == 'b':
            return 1
        if self.answ_correct == 'c':
            return 2
        if self.answ_correct == 'd':
            return 3


def load_test(fi) -> tuple:
    test = fulltext.get(fi).replace('Choose the best word or phrase (a, b, c or d) to fill each blank.', '')
    if "answer sheet" in test.lower():
        test = test[:test.lower().find("answer sheet")]
    reading = test[test.lower().find("read the text below"):test.find("(21)")]
    test = test.replace(reading, "")
    return test, reading
