from django.db import models
from django.conf import settings
from enum import Enum


class Major(Enum):
    SE = 'Software Engineering'
    AMI = 'Applied Mathematics and Information Science'

    @staticmethod
    def get_name(value):
        if value.lower() == Major.SE.value.lower():
            return Major.SE.name
        elif value.lower() == Major.AMI.value.lower():
            return Major.AMI.name

    def __eq__(self, other):
        return str(other).lower() == str(self.name).lower()


class UserMajor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    user_major = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in Major],
        null=True, blank=True
    )
