from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from .permissions import IsNotAuthenticated
from user_pref.models import UserPreferences
from user_pref.models import Preference
from user_major.models import UserMajor, Major
from django.http import HttpResponseRedirect
from django.shortcuts import render
from evaluation.models import Mark

BASE_PATH = 'http://localhost:5000/'


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
            Mark.objects.create(user=user)
            del response['password']
            del response['first_name']
            del response['last_name']
            return HttpResponseRedirect(BASE_PATH + 'account/login/')
        else:
            return HttpResponseRedirect(BASE_PATH + 'api/registration/signup/')


def redirect(request):
    return render(request, 'signup.html')
