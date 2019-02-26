from django.db import models
from evaluation.models import TestLevel


class Scaler(models.Model):
    lower = models.SmallIntegerField()
    upper = models.SmallIntegerField()
    level = models.CharField(
        max_length=29,
        choices=[(tag.name, tag.value) for tag in TestLevel],
        default=TestLevel.A1)
