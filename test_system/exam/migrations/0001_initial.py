# Generated by Django 2.1.4 on 2019-02-20 14:38

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
            ],
        ),
    ]
