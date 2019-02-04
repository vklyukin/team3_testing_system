from django.db import models
from django.conf import settings
from enum import Enum


# Subclass of Enum for preferences definition
class Preference(Enum):
    STUDENT = 'Student'
    TEACHER = 'Teacher'
    ADMIN = 'Admin'


class UserPreferences(models.Model):
    """Represents user's status (e.g. STUDENT, TEACHER, ADMIN)"""

    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    user_preference = models.CharField(
        max_length=19,
        choices=[(tag.name, tag.value) for tag in Preference],
        default=Preference.STUDENT.name
    )

    def __str__(self):
        return f"{self.userID}: {self.user_preference}\n"

    def __repr__(self):
        return self.__str__()

    # Get unambiguous ID of owner
    def many_to_many(self):
        return self.userID

    # Get user's preference as Enum (Preference) value
    def type_of_preference(self):
        return self.user_preference
