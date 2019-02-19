from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from .permissions import IsNotAuthenticated
from user_pref.models import UserPreferences
from user_pref.models import Preference


class UserCreate(CreateAPIView):
    """
    Creates the user.
    """
    permission_classes = (IsNotAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        # try:
        serialized = UserSerializer(data=request.data)
        if serialized.is_valid():
            user = serialized.save()
            response = serialized.data
            UserPreferences.objects.create(
                user = user,
                user_preference = Preference.STUDENT,
            )
            del response['password']
            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
