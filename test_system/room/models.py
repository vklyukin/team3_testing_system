from django.db import models
# from datetime import timedelta # <3


class Room(models.Model):
    number = models.SmallIntegerField(default=0)
    amount_stud = models.SmallIntegerField(default=0)
    # avg_time = models.DurationField(default=timedelta(minutes=7)) # <3
    amount_teach = models.SmallIntegerField(default=0)
