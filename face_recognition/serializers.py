from rest_framework import serializers

from .models import RecognizedFace


class RecognizedFaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecognizedFace
        fields = ['id', 'left', 'top', 'width', 'height', 'tag_name']
        read_only_fields = ['left', 'top', 'width', 'height']
