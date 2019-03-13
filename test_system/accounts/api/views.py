import xlsxwriter
from io import BytesIO
from django.http import StreamingHttpResponse
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth.models import User
from .permissions import IsNotAuthenticated, EmptyPermission, IsTeacherOrAdmin
from user_major.models import UserMajor, Major
from django.http import HttpResponseRedirect
from django.shortcuts import render
from evaluation.models import Mark
from user_pref.models import Preference, UserPreferences
from stud_id.models import UserStudentID
from test_system import base_path


class UserCreate(CreateAPIView):
    """
    Creates the user.
    """
    permission_classes = (IsNotAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():
            user = serialized.save()
            response = serialized.data
            UserPreferences.objects.create(
                user=user,
                user_preference=Preference.STUDENT.name
            )
            UserMajor.objects.create(
                user=user,
                user_major=Major.get_name(request.data['major'])
            )
            Mark.objects.create(user=user, first_name=user.first_name, second_name=user.last_name,
                                major=Major.get_name(request.data['major']))
            UserStudentID.objects.create(user=user, student_id=request.data['password'])
            del response['password']
            del response['first_name']
            del response['last_name']
            return HttpResponseRedirect(base_path.BASE_PATH + 'account/login/')
        else:
            return HttpResponseRedirect(base_path.BASE_PATH + 'api/registration/signup/')


def get_student_list():
    users = User.objects.all()
    se = []
    ami = []
    for user in users:
        pref = UserPreferences.objects.filter(user=user.pk)
        if len(pref) > 0 and pref[0].user_preference == Preference.STUDENT:
            major = UserMajor.objects.filter(user=user.pk)
            if len(major) > 0:
                u_major = major[0].user_major
                pass_s = UserStudentID.objects.filter(user=user.pk)
                password = 'Unknown'
                if len(pass_s) > 0:
                    password = pass_s[0].student_id
                if u_major == Major.SE:
                    se.append(
                        ['Программная инженерия', 'Имя: ' + user.first_name, 'Фамилия: ' + user.last_name,
                         'Логин: ' + user.username, 'Пароль: ' + password,
                         'email: ' + user.email])
                if u_major == Major.AMI:
                    ami.append(
                        ['Прикладная математика и информатика', 'Имя: ' + user.first_name, 'Фамилия: ' + user.last_name,
                         'Логин: ' + user.username, 'Пароль: ' + password,
                         'email: ' + user.email])
    return se + ami


class StudentListView(APIView):

    def get_permissions(self):
        if self.request.user.is_authenticated:
            pref = UserPreferences.objects.filter(user=self.request.user)
            if pref[0].user_preference == Preference.STUDENT:
                return [EmptyPermission()]
            elif pref[0].user_preference == Preference.ADMIN or pref[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        else:
            return [EmptyPermission()]

    def get(self, request):
        data = get_student_list()

        # create workbook with worksheet
        output = BytesIO()
        book = xlsxwriter.Workbook(output)
        sheet = book.add_worksheet()

        # fill worksheet
        for row, columns in enumerate(data):
            for column, cell_data in enumerate(columns):
                sheet.write(row, column, cell_data)

        book.close()  # close book and save it in "output"
        output.seek(0)  # seek stream on begin to retrieve all data from it

        # send "output" object to stream with mimetype and filename
        response = StreamingHttpResponse(
            output, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=Student_list.xlsx'
        return response


def redirect(request):
    return render(request, 'signup.html')
