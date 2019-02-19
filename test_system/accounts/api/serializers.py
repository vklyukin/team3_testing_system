from rest_framework import serializers
from rest_framework.compat import MaxLengthValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        # required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'], )
        return user

    class Meta:
        model = User
        fields = ('pk', 'username', 'password')
