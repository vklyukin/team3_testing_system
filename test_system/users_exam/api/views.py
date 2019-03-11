from rest_framework import generics
from .serializers import UsersExamAPISerializer, UsersExamSerializer
from .permissions import IsStudent, IsTeacher, IsAdmin, EmptyPermission
from user_pref.models import UserPreferences, Preference
from django.db.models import Q
from users_exam.models import UsersExam
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render
from student_answer.models import StudentAnswer


BASE_PATH = 'http://localhost:5000/'


class UsersExamAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        return UsersExamAPISerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return [IsStudent()]
            elif qs[0].user_preference == Preference.ADMIN:
                return [IsAdmin()]
            elif qs[0].user_preference == Preference.TEACHER:
                return [IsTeacher()]
        return [EmptyPermission()]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                sa = UsersExam.objects.all()
                sa = sa.filter(Q(user=self.request.user))
                return sa
            elif qs[0].user_preference == Preference.TEACHER or qs[0].user_preference == Preference.ADMIN:
                return UsersExam.objects.all()

    def create(self, request, *args, **kwargs):
        serialized = UsersExamAPISerializer(data=request.data, context={'request': request})
        print(serialized.is_valid())
        if serialized.is_valid():
            users_exam = serialized.save()
            response = serialized.data
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class UsersExamRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        return UsersExamSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return [IsStudent()]
            elif qs[0].user_preference == Preference.ADMIN:
                return [IsAdmin()]
            elif qs[0].user_preference == Preference.TEACHER:
                return [IsTeacher()]
        return [EmptyPermission()]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                sa = UsersExam.objects.all()
                sa = sa.filter(Q(user=self.request.user))
                return sa
            elif qs[0].user_preference == Preference.TEACHER or qs[0].user_preference == Preference.ADMIN:
                sa = UsersExam.objects.all()
                return sa

@login_required
def redirect(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.STUDENT:
        answers = StudentAnswer.objects.filter(user=request.user)
        if len(answers.exclude(time_started__isnull=True)) > 0:
            return HttpResponseRedirect(BASE_PATH + 'speaking/info/')
        return render(request, 'stream_choose.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'test_editor/')
