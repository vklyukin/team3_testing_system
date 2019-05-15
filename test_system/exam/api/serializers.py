from rest_framework import serializers
from exam.models import ExamSession


class ExamSessionAPISerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = ExamSession.objects.create(start=validated_data['start'], finish=validated_data['finish'],
                                          stream=validated_data['stream'], major=validated_data['major'],
                                          start_button=False)
        return user

    class Meta:
        model = ExamSession
        fields = [
            'pk',
            'start',
            'finish',
            'stream',
            'major'
            'start_button'
        ]


class ExamSessionStudentAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamSession
        fields = [
            'pk',
            'start',
            'finish',
            'stream',
            'start_button'
        ]


class ExamSessionSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.start = validated_data.get('start', instance.start)
        instance.finish = validated_data.get('finish', instance.finish)
        instance.stream = validated_data.get('stream', instance.stream)
        instance.start_button = validated_data.get('start_button', instance.stream)
        instance.save()
        return instance

    class Meta:
        model = ExamSession
        fields = [
            'pk',
            'start',
            'finish',
            'stream',
            'start_button'
        ]


class ExamSessionTeacherSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.start = validated_data.get('start', instance.start)
        instance.finish = validated_data.get('finish', instance.finish)
        instance.stream = validated_data.get('stream', instance.stream)
        instance.major = validated_data.get('major', instance.major)
        instance.start_button = validated_data.get('start_button', instance.major)
        instance.save()
        return instance

    class Meta:
        model = ExamSession
        fields = [
            'pk',
            'start',
            'finish',
            'stream',
            'major',
            'start_button'
        ]
