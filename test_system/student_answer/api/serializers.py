from rest_framework import serializers
from student_answer.models import StudentAnswer


class StudentAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        fields = [
            'answer',
            'user',
            'question',
        ]
        # read_only_fields = [
        #     'user',
        #     'question',
        # ]


class StudentAnswerSerializerEmpty(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        exclude = [
            'answer',
            'user',
            'question',
        ]
