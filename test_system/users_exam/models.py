from django.db import models
from django.conf import settings
from exam.models import ExamSession


class UsersExam(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    exam = models.ForeignKey(ExamSession, on_delete=models.CASCADE)

    @property
    def owner(self):
        return self.user
