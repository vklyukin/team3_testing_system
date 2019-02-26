from rest_framework import serializers
from users_exam.models import UsersExam
from student_answer.models import StudentAnswer
from test_question.models import TestQuestion
from evaluation.models import Mark
import numpy as np


class UsersExamAPISerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if not UsersExam.objects.filter(user=self.context['request'].user).exists():
            user = UsersExam.objects.create(user=self.context['request'].user, exam=validated_data['exam'])
        else:
            UsersExam.objects.filter(user=self.context['request'].user).update(exam=validated_data['exam'])
            user = UsersExam.objects.get(user=self.context['request'].user)
            StudentAnswer.objects.filter(user=self.context['request'].user).delete()
            Mark.objects.filter(user=self.context['request'].user).delete()
        q_read = TestQuestion.objects.filter(is_reading=True)
        q_not_read = TestQuestion.objects.filter(is_reading=False)
        total = len(q_read) + len(q_not_read)
        not_read_order = np.random.permutation(range(1, len(q_not_read) + 1))
        for i in range(len(not_read_order)):
            StudentAnswer.objects.create(number=not_read_order[i],
                                         user=self.context['request'].user, question=q_not_read[i])
        read_order = np.random.permutation(range(len(q_not_read) + 1, total + 1))
        for i in range(len(read_order)):
            StudentAnswer.objects.create(number=read_order[i],
                                         user=self.context['request'].user, question=q_read[i])
        Mark.objects.create(user=self.context['request'].user)
        return user

    class Meta:
        model = UsersExam
        fields = [
            'exam',
        ]
        read_only_fields = ['user', ]


class UsersExamSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.start = validated_data.get('start', instance.start)
        instance.finish = validated_data.get('finish', instance.finish)
        instance.save()
        return instance

    class Meta:
        model = UsersExam
        fields = [
            'user',
            'exam',
        ]
