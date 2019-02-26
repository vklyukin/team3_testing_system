from rest_framework import serializers
from evaluation.models import Mark


class MarksSerializer(serializers.ModelSerializer):

    # def update(self, instance, validated_data):
    #     instance.test_mark = validated_data.get('test_mark', instance.test_mark)
    #     instance.speaking_mark = validated_data.get('speaking_mark', instance.speaking_mark)
    #     instance.level_mark = validated_data.get('level_mark', instance.level_mark)
    #     instance.save()
    #     return instance

    class Meta:
        model = Mark
        fields = '__all__'
        # many = True


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
