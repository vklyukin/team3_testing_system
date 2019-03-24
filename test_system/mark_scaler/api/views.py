from rest_framework import generics
from mark_scaler.models import Scaler
from user_pref.models import UserPreferences, Preference
from .permissions import EmptyPermission, IsTeacherOrAdmin
from .serializers import ScalerSerializer
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect


class ScalerAPIView(generics.ListAPIView, generics.CreateAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return ScalerSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.STUDENT:
                return [EmptyPermission()]
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [EmptyPermission()]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Scaler.objects.all()


class ScalerRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return ScalerSerializer

    def get_permissions(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.filter(user=self.request.user)
            if qs[0].user_preference == Preference.STUDENT:
                return [EmptyPermission()]
            elif qs[0].user_preference == Preference.ADMIN or \
                    qs[0].user_preference == Preference.TEACHER:
                return [IsTeacherOrAdmin()]
        return [EmptyPermission()]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Scaler.objects.all()
