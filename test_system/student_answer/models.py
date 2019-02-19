from django.db import models
from django.conf import settings
from test_question.models import TestQuestion


class StudentAnswer(models.Model):
    number = models.IntegerField(default=-1)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.ForeignKey(TestQuestion, on_delete=models.CASCADE)
    answer = models.SmallIntegerField(default=32767)
    started = models.BooleanField(default=False)

    @property
    def owner(self):
        return self.user
