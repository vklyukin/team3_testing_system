# Generated by Django 2.2.1 on 2019-06-01 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ExamSession',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField(blank=True, null=True)),
                ('finish', models.DateTimeField(blank=True, null=True)),
                ('stream', models.TextField()),
                ('major', models.CharField(blank=True, choices=[('SE', 'Software Engineering'), ('AMI', 'Applied Mathematics and Information Science')], max_length=50, null=True)),
                ('start_button', models.BooleanField(default=False)),
            ],
        ),
    ]
