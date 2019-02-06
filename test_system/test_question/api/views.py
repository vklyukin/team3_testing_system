from rest_framework import generics, mixins
from test_question.models import TestQuestion
from .serializers import TeacherQuestionSerializer, StudentQuestionSerializer, EmptyQuestionSerializer
from django.db.models import Q
from .permissions import IsStudent, IsAdmin, IsTeacher, EmptyPermission
from user_pref.models import UserPreferences, Preference


# from rest_framework_simplejwt import authentication


class TestQuestionAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return StudentQuestionSerializer
            elif qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return TeacherQuestionSerializer
        return EmptyQuestionSerializer

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
        qs = TestQuestion.objects.all()
        return qs


class TestQuestionRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return StudentQuestionSerializer
            elif qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return TeacherQuestionSerializer
        return EmptyQuestionSerializer

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
        return TestQuestion.objects.all()
