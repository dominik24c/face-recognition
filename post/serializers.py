from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'post_picture']
        extra_kwargs = {
            'id': {'read_only': True}
        }
