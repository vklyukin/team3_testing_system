from rest_framework import serializers
from student_answer.models import StudentAnswer
from test_question.models import TestQuestion
from django.utils.timezone import now, localtime
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q


class StudentAnswerSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        if not instance.time_started:
            raise PermissionDenied()
        return instance

    class Meta:
        model = StudentAnswer
        fields = [
            'pk',
            'number',
            'answer',
            'user',
            'question',
        ]


class StudentAnswerAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        fields = [
            'pk',
            'number',
            'answer',
            'user',
        ]
        read_only_fields = ('question')


class StudentAnswerSerializerEmpty(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        exclude = [
            'answer',
            'number',
            'user',
            'question',
        ]
