from rest_framework import serializers
from speaking_queue.models import TeacherSpeaking
from room.models import Room


class SpeakingSerializer(serializers.ModelSerializer):

    def validate_user(self):
        return self.context['request'].user

    def create(self, validated_data):
        speaking = TeacherSpeaking.objects.create(teacher=self.validate_user(), room=validated_data['room'])
        Room.objects.filter(pk=speaking.room.pk).update(amount_teach=speaking.room.amount_teach + 1)
        return speaking

    class Meta:
        model = TeacherSpeaking
        fields = [
            'pk',
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
