from django.db import models

from post.models import Post


# Create your models here.

class RecognizedFace(models.Model):
    width = models.IntegerField()
    height = models.IntegerField()
    left = models.IntegerField()
    top = models.IntegerField()
    tag_name = models.CharField(max_length=255, null=True)
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='recognized_faces')
