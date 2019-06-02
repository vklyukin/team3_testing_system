# Generated by Django 2.2.1 on 2019-06-01 23:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('room', '0001_initial'),
        ('speaking_queue', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mark',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test_mark', models.IntegerField(default=0)),
                ('test_level', models.CharField(choices=[('A1', 'Beginner'), ('A2', 'Elementary'), ('B1', 'Pre-Intermediate'), ('B2', 'Intermediate'), ('C1', 'Upper-Intermediate'), ('C2', 'Advanced')], default='A1', max_length=29)),
                ('removed', models.BooleanField(default=False)),
                ('speaking_mark', models.CharField(choices=[('A1m', 'Beginner-'), ('A1p', 'Beginner+'), ('A2m', 'Elementary-'), ('A2p', 'Elementary+'), ('B1m', 'Pre-Intermediate-'), ('B1p', 'Pre-Intermediate+'), ('B2m', 'Intermediate-'), ('B2p', 'Intermediate+'), ('C1m', 'Upper-Intermediate-'), ('C1p', 'Upper-Intermediate+'), ('C2m', 'Advanced-'), ('C2p', 'Advanced+')], default='A1m', max_length=29)),
                ('level', models.CharField(choices=[('A1', 'Beginner'), ('A2', 'Elementary'), ('B1', 'Pre-Intermediate'), ('B2', 'Intermediate'), ('C1', 'Upper-Intermediate'), ('C2', 'Advanced')], default='A1', max_length=29)),
                ('first_name', models.CharField(max_length=30)),
                ('second_name', models.CharField(max_length=150)),
                ('position', models.SmallIntegerField(default=0)),
                ('confident', models.BooleanField(default=True)),
                ('major', models.CharField(blank=True, choices=[('SE', 'Software Engineering'), ('AMI', 'Applied Mathematics and Information Science')], max_length=50, null=True)),
                ('email_received', models.BooleanField(default=False)),
                ('room', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='room.Room')),
                ('speaking', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='speaking_queue.TeacherSpeaking')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
