from rest_framework import serializers
from student_answer.models import StudentAnswer


class StudentAnswerSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        if not instance.started:
            print("=======2========")
            instance.started = True
            instance.answer = validated_data.get('answer', instance.answer)
            instance.save()
        return instance

    class Meta:
        model = StudentAnswer
        fields = [
            'pk',
            'number',
            'answer',
            'user',
            'question',
            'started'
        ]
        read_only_fields = ('started',)
        # read_only_fields = [
        #     'user',
        #     'question',
        # ]


class StudentAnswerSerializerEmpty(serializers.ModelSerializer):
    class Meta:
        model = StudentAnswer
        exclude = [
            'answer',
            'number',
            'user',
            'question',
            'started',
        ]
