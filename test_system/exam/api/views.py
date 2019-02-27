from rest_framework import generics
from .serializers import ExamSessionAPISerializer, ExamSessionSerializer, ExamSessionStudentAPISerializer, \
    ExamSessionTeacherSerializer
from .permissions import IsTeacherOrAdmin, IsStudentOrNotAuth
from user_pref.models import UserPreferences, Preference
from django.db.models import Q
from exam.models import ExamSession
from rest_framework.response import Response
from user_major.models import Major, UserMajor
from rest_framework import status


class ExamSessionAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            pref = UserPreferences.objects.filter(user=self.request.user)
            if pref[0].user_preference == Preference.STUDENT:
                return ExamSessionStudentAPISerializer
            elif pref[0].user_preference == Preference.ADMIN or \
                    pref[0].user_preference == Preference.TEACHER:
                return ExamSessionAPISerializer
        else:
            return ExamSessionStudentAPISerializer

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

    def get_queryset(self):
        if self.request.user.is_authenticated:
            pref = UserPreferences.objects.filter(user=self.request.user)
            if pref[0].user_preference == Preference.STUDENT:
                major = UserMajor.objects.filter(user=self.request.user)
                return ExamSession.objects.filter(major=major[0].user_major)
            elif pref[0].user_preference == Preference.ADMIN or pref[0].user_preference == Preference.TEACHER:
                return ExamSession.objects.all()
            else:
                return ExamSession.objects.none()

    def create(self, request, *args, **kwargs):
        serialized = ExamSessionAPISerializer(data=request.data)
        if serialized.is_valid():
            exam = serialized.save()
            response = serialized.data
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class ExamSessionRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            pref = UserPreferences.objects.filter(user=self.request.user)
            if pref[0].user_preference == Preference.STUDENT:
                return ExamSessionSerializer
            elif pref[0].user_preference == Preference.ADMIN or \
                    pref[0].user_preference == Preference.TEACHER:
                return ExamSessionTeacherSerializer
        else:
            return ExamSessionSerializer

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

    def get_queryset(self):
        if self.request.user.is_authenticated:
            pref = UserPreferences.objects.filter(user=self.request.user)
            if pref[0].user_preference == Preference.STUDENT:
                major = UserMajor.objects.filter(user=self.request.user)
                return ExamSession.objects.filter(major=major[0].user_major)
            elif pref[0].user_preference == Preference.ADMIN or pref[0].user_preference == Preference.TEACHER:
                return ExamSession.objects.all()
            else:
                return ExamSession.objects.none()
