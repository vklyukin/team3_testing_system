# Generated by Django 2.1.4 on 2019-02-04 20:08

from django.db import migrations, models
import user_pref.models


class Migration(migrations.Migration):

    dependencies = [
        ('user_pref', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpreferences',
            name='user_preference',
            field=models.CharField(choices=[(user_pref.models.Preference('Student'), 'Student'), (user_pref.models.Preference('Teacher'), 'Teacher'), (user_pref.models.Preference('Admin'), 'Admin')], max_length=19),
        ),
    ]