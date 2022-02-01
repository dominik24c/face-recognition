# Generated by Django 4.0 on 2022-02-01 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RecognizedFace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('width', models.IntegerField()),
                ('height', models.IntegerField()),
                ('left', models.IntegerField()),
                ('top', models.IntegerField()),
                ('tag_name', models.CharField(max_length=255, null=True)),
            ],
        ),
    ]
