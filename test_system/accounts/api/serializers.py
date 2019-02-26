from rest_framework import serializers
from rest_framework.compat import MaxLengthValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class CustomUniqueEmailValidator(UniqueValidator):
    def filter_queryset(self, value, queryset):
        """
        Filter the queryset to all instances matching the given attribute.
        """
        return User.objects.all().filter(email__contains=value)


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        # source='user.email', required=True,
        validators=[CustomUniqueEmailValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        # required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)

    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'],
                                        password=validated_data['password'],
                                        first_name=validated_data['first_name'], last_name=validated_data['last_name'],
                                        )
        return user

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'password', 'first_name', 'last_name')
