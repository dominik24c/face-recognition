# Generated by Django 4.0 on 2022-02-01 14:23

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import post.utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(5)])),
                ('description', models.TextField(max_length=500, validators=[django.core.validators.MinLengthValidator(5)])),
                ('post_picture', models.ImageField(blank=True, null=True, upload_to=post.utils.post_image_upload_handler, validators=[post.utils.validate_image, django.core.validators.FileExtensionValidator(('gif', 'bmp', 'png', 'jpeg'))], verbose_name='post picture')),
                ('is_recognized', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='auth.user')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=100)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='auth.user')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='post.post')),
            ],
        ),
    ]
