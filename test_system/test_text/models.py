from django.db import models
from datetime import timedelta


class ReadingTest(models.Model):
    text = models.TextField()
    time_recommended = models.DurationField(default=timedelta(minutes=20))
