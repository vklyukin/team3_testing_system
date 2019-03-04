from rest_framework import serializers
from speaking_queue.models import TeacherSpeaking


class SpeakingSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        speaking = TeacherSpeaking.objects.create(teacher=validated_data['teacher'], room=validated_data['room'])
        return speaking

    class Meta:
        model = TeacherSpeaking
        fields = [
            'pk',
            'teacher',
            'room'
        ]


class SpeakingStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherSpeaking
        exclude = [
            'pk',
            'teacher',
            'room'
        ]
