from rest_framework import serializers
from evaluation.models import Mark


class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            'user',
            'test_mark',
            'removed',
            'speaking',
            'speaking_mark',
            'level'
        ]


class MarkStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            'user',
            'removed',
            'speaking'
        ]
        read_only_fields = [
            'test_mark',
            'speaking_mark',
            'level',
            'removed'
        ]
