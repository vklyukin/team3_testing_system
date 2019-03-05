from rest_framework import serializers
from room.models import Room


class RoomSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        room = Room.objects.create(number=validated_data['number'],
                                   avg_time=validated_data['avg_time'],
                                   )
        return room

    class Meta:
        model = Room
        fields = [
            'pk',
            'number',
            'amount_stud',
            'avg_time',
            'amount_teach'
        ]
