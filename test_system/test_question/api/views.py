from rest_framework import generics, mixins, status
from django.core.exceptions import PermissionDenied
from test_question.models import TestQuestion
from test_text.models import ReadingTest
from student_answer.models import StudentAnswer
from .serializers import TeacherQuestionSerializer, StudentQuestionSerializer, EmptyQuestionSerializer, \
    TestQuestionCreateSerializer, TestQuestionReading, TestQuestionReadingEmpty, StudentQuestionAPISerializer, TestQuestionReadingAPISerializer
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .permissions import IsStudent, IsAdmin, IsTeacher, EmptyPermission
from user_pref.models import UserPreferences, Preference
from django.shortcuts import get_object_or_404
from django.utils.timezone import now, localtime
from users_exam.models import UsersExam
from exam.models import ExamSession


class TestQuestionAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.STUDENT:
                return StudentQuestionAPISerializer
            elif qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return TeacherQuestionSerializer
        return EmptyQuestionSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            if qs[0].user_preference == Preference.ADMIN:
                return [IsAdmin()]
            elif qs[0].user_preference == Preference.TEACHER:
                return [IsTeacher()]
        return [EmptyPermission()]

    def get_queryset(self):
        qs = TestQuestion.objects.all()
        return qs

    def create(self, request, *args, **kwargs):
        serialized = TestQuestionCreateSerializer(data=request.data)
        if serialized.is_valid():
            serialized.save()
            response = serialized.data
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


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

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
                'Expected view %s to be called with a URL keyword argument '
                'named "%s". Fix your URL conf, or set the `.lookup_field` '
                'attribute on the view correctly.' %
                (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, **filter_kwargs)
        try:
            sa = StudentAnswer.objects.get(user=self.request.user, question=obj)
            if not sa.time_started:
                sa.time_started = localtime(now())
                sa.save()
        except StudentAnswer.DoesNotExist:
            pass

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj


class TestQuestionReadingRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return TestQuestionReading
        return TestQuestionReadingEmpty

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
                if UsersExam.objects.filter(user__exact=self.request.user).count() > 0:
                    u_exam = UsersExam.objects.get(user__exact=self.request.user)
                    exam = u_exam.exam
                    _now = localtime(now())
                    if exam.start <= _now <= exam.finish:
                        return ReadingTest.objects.all()
                    else:
                        raise PermissionDenied
                else:
                    return ReadingTest.objects.none()
            elif qs[0].user_preference == Preference.TEACHER or qs[0].user_preference == Preference.ADMIN:
                return ReadingTest.objects.all()


class TestQuestionReadingAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'
    serializer_class = TestQuestionReadingAPISerializer


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
                if UsersExam.objects.filter(user__exact=self.request.user).count() > 0:
                    u_exam = UsersExam.objects.get(user__exact=self.request.user)
                    exam = u_exam.exam
                    _now = localtime(now())
                    if exam.start <= _now <= exam.finish:
                        return ReadingTest.objects.all()
                    else:
                        raise PermissionDenied
                else:
                    return ReadingTest.objects.none()
            elif qs[0].user_preference == Preference.TEACHER or qs[0].user_preference == Preference.ADMIN:
                return ReadingTest.objects.all()
