# Generated by Django 4.0 on 2022-02-01 19:29

import django.core.validators
from django.db import migrations, models
import post.utils


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post_picture',
            field=models.ImageField(blank=True, null=True, upload_to=post.utils.post_image_upload_handler, validators=[post.utils.validate_image, django.core.validators.FileExtensionValidator(('gif', 'bmp', 'png', 'jpeg', 'jpg'))], verbose_name='post picture'),
        ),
    ]
