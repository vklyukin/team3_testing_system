from django.db import models
from django.conf import settings
from test_question.models import TestQuestion


class StudentAnswer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.OneToOneField(TestQuestion, on_delete=models.CASCADE)
    answer = models.SmallIntegerField()

    @property
    def owner(self):
        return self.user
