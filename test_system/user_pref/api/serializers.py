from rest_framework import serializers
from user_pref.models import UserPreferences


class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = [
            'user_preference'
        ]
        read_only_fields = ['userID']
