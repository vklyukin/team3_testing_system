from rest_framework import serializers
from file_uploader.models import File
class FileSerializer(serializers.ModelSerializer):
    class Meta():
        model = File
        fields = ('file', )
