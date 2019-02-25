from rest_framework import generics
from user_pref.models import UserPreferences, Preference
from django.db.models import Q
from .serializers import MarkStudentSerializer, MarksSerializer
from .permissions import IsStudent, IsTeacherOrAdmin, EmptyPermission
from django.core.exceptions import PermissionDenied
from evaluation.models import Mark, SpeakingLevel, TestLevel
from mark_scaler.models import Scaler
from student_answer.models import StudentAnswer
from test_question.models import TestQuestion
from django.http import HttpResponse


class MarkAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return MarkStudentSerializer
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return MarksSerializer
        return MarkStudentSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return [IsStudent()]
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [EmptyPermission()]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                sa = Mark.objects.filter(user=self.request.user)
                return sa
            elif qs[0].user_preference == Preference.TEACHER or qs[0].user_preference == Preference.ADMIN:
                return Mark.objects.all()


class MarkRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return MarksSerializer
            if qs[0].user_preference == Preference.STUDENT:
                return MarkStudentSerializer
        return MarkStudentSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return [IsStudent()]
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [EmptyPermission()]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                sa = Mark.objects.filter(user=self.request.user)
                return sa
            elif qs[0].user_preference == Preference.TEACHER or qs[0].user_preference == Preference.ADMIN:
                sa = Mark.objects.all()
                return sa


class CountMarksView(generics.ListAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return MarksSerializer
            if qs[0].user_preference == Preference.STUDENT:
                return MarkStudentSerializer
        return MarkStudentSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return [EmptyPermission()]
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [EmptyPermission()]

    @staticmethod
    def evaluate(mark):
        bounds = Scaler.objects.all()
        for bound in bounds:
            if bound.lower <= mark.test_mark <= bound.upper:
                Mark.objects.filter(pk=mark.pk).update(test_level=TestLevel.get_enum(bound.level))
                return TestLevel.get_value(bound.level)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            pref = UserPreferences.objects.filter(user=self.request.user)
            if pref.user_preference == Preference.STUDENT:
                raise PermissionDenied
            elif pref.user_preference == Preference.TEACHER or pref.user_preference == Preference.ADMIN:
                marks = Mark.objects.all()
                try:
                    for mark in marks:
                        answers = StudentAnswer.objects.filter(user=mark.user)
                        count = 0
                        for ans in answers:
                            question = TestQuestion.objects.get(pk=ans.question)
                            if question.answ_correct == ans.answer:
                                count += 1
                        Mark.objects.filter(pk=mark.pk).update(test_mark=count)
                        if mark.speaking_mark:
                            sp_mark = SpeakingLevel.get_value(mark.speaking_mark)
                            t_mark = self.evaluate(mark)
                            Mark.objects.filter(pk=mark.pk).update(TestLevel.rev_vals()[int(sp_mark + t_mark)])
                except Exception:
                    return HttpResponse('Unknown error', status=520)
