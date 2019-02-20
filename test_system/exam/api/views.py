from rest_framework import generics
from .serializers import ExamSessionAPISerializer, ExamSessionSerializer
from .permissions import IsTeacherOrAdmin, IsStudentOrNotAuth
from user_pref.models import UserPreferences, Preference
from django.db.models import Q
from exam.models import ExamSession
from rest_framework.response import Response
from rest_framework import status


class ExamSessionAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        return ExamSessionAPISerializer

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
        return ExamSession.objects.all()

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
        return ExamSession.objects.all()
