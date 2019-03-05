from rest_framework import generics
from user_pref.models import UserPreferences, Preference
from room.models import Room
from rest_framework.response import Response
from rest_framework import status
from .permissions import *
from .serializers import RoomSerializer


class RoomAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        return RoomSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
            elif qs[0].user_preference == Preference.STUDENT:
                return [IsStudent()]
        return [EmptyPermission()]

    def get_queryset(self):
        qs = Room.objects.all()
        return qs

    def create(self, request, *args, **kwargs):
        serialized = RoomSerializer(data=request.data)
        if serialized.is_valid():
            serialized.save()
            response = serialized.data
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


class RoomRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        return RoomSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
            elif qs[0].user_preference == Preference.STUDENT:
                return [IsStudent()]
        return [EmptyPermission()]

    def get_queryset(self):
        return Room.objects.all()
