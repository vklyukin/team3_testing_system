from django.db import models
from django.conf import settings


class TeacherSpeaking(models.Model):
    teacher = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.SmallIntegerField(null=True, blank=True)
