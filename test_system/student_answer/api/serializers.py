from rest_framework import serializers
from student_answer.models import StudentAnswer
from test_question.models import TestQuestion
from django.utils.timezone import now, localtime
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from datetime import timedelta

delta = timedelta(seconds=3)


class StudentAnswerSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        if instance.time_started:
            q = TestQuestion.objects.all()
            q = q.filter(Q(number__exact=instance.question.number))
            if localtime(now()) - instance.time_started < q[0].duration + delta:
                instance.answer = validated_data.get('answer', instance.answer)
                instance.save()
            else:
                raise PermissionDenied()
        else:
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
            'time_started'
        ]
        read_only_fields = ('time_started',)


class StudentAnswerAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        fields = [
            'pk',
            'number',
            'answer',
            'user',
            'time_started'
        ]
        read_only_fields = ('time_started', 'question')


class StudentAnswerSerializerEmpty(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        exclude = [
            'answer',
            'number',
            'user',
            'question',
            'time_started',
        ]
