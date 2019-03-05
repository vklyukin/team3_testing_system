from rest_framework import generics, mixins, status
from django.core.exceptions import PermissionDenied
from user_pref.models import UserPreferences, Preference
from speaking_queue.models import TeacherSpeaking
from rest_framework.response import Response
from rest_framework import status
from .permissions import *
from .serializers import *


class SpeakingAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.STUDENT:
                return SpeakingStudentSerializer
            elif qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return SpeakingSerializer
        return SpeakingStudentSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [EmptyPermission()]

    def get_queryset(self):
        qs = TeacherSpeaking.objects.all()
        return qs

    def create(self, request, *args, **kwargs):
        serialized = SpeakingSerializer(data=request.data, context={'request': request})
        if serialized.is_valid():
            serialized.save()
            response = serialized.data
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class SpeakingRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return SpeakingSerializer
        return SpeakingStudentSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [EmptyPermission()]

    def get_queryset(self):
        return TeacherSpeaking.objects.all()
