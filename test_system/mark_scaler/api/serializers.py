from rest_framework import serializers
from mark_scaler.models import Scaler


class ScalerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scaler
        fields = [
            'lower',
            'upper',
            'level',
        ]
