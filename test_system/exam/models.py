from django.db import models


class ExamSession(models.Model):
    start = models.DateTimeField(null=True, blank=True)
    finish = models.DateTimeField(null=True, blank=True)
    stream = models.TextField()
