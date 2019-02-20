from rest_framework import serializers
from users_exam.models import UsersExam


class UsersExamAPISerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        user = UsersExam.objects.create(user=validated_data['user'], exam=validated_data['exam'])
        return user

    class Meta:
        model = UsersExam
        fields = [
            'user',
            'exam',
        ]


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
