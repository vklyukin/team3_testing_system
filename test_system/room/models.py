from django.db import models


class Room(models.Model):
    number = models.SmallIntegerField(default=0)
    amount_stud = models.SmallIntegerField(default=0)
    avg_time = models.FloatField(default=7)
    amount_teach = models.SmallIntegerField(default=0)
