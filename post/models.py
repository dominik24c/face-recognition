from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, FileExtensionValidator
from django.db import models
from django.conf import settings
from .utils import post_image_upload_handler, validate_image


# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100, validators=[MinLengthValidator(5)])
    description = models.TextField(max_length=500, validators=[MinLengthValidator(5)])
    post_picture = models.ImageField(verbose_name='post picture', upload_to=post_image_upload_handler,
                                     validators=[validate_image,
                                                 FileExtensionValidator(settings.ALLOWED_IMAGE_EXTENSIONS)],
                                     blank=True, null=True)
    is_recognized = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')


class Comment(models.Model):
    content = models.CharField(max_length=100, blank=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='posts')
