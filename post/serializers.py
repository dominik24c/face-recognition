from rest_framework import serializers

from face_recognition.serializers import RecognizedFaceSerializer
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'post_picture']
        extra_kwargs = {
            'id': {'read_only': True}
        }


class PostWithRecognizedFaces(PostSerializer):
    recognized_faces = RecognizedFaceSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'post_picture', 'recognized_faces']
        extra_kwargs = {
            'id': {'read_only': True}
        }
