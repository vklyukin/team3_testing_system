# Generated by Django 2.1.7 on 2019-03-04 13:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='avg_time',
            field=models.DurationField(default=datetime.timedelta(0, 120)),
        ),
    ]
