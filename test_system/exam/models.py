from django.db import models
from user_major.models import Major


class ExamSession(models.Model):
    start = models.DateTimeField(null=True, blank=True)
    finish = models.DateTimeField(null=True, blank=True)
    stream = models.TextField()
    major = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in Major],
        null=True, blank=True
    )
