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
        fields = ['pk', 'test_mark', 'test_level', 'removed', 'speaking_mark', 'level', 'user', 'speaking',
                  'first_name',
                  'second_name',
                  'room',
                  'position',
                  'confident',
                  'major']


class MarkStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = [
            'pk',
            'user',
            'room',
            'position',
            'first_name',
            'second_name',
            'removed',
        ]
        read_only_fields = [
            'user',
            'position',
            'first_name',
            'second_name',
            'test_mark',
            'speaking_mark',
            'level',
            'removed',
            'confident',
            'removed',
            'speaking',
            'major',
        ]
