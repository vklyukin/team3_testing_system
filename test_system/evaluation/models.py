from django.db import models
from django.conf import settings
from speaking_queue.models import TeacherSpeaking
from enum import Enum


class TestLevel(Enum):
    A1 = 'Beginner'
    A2 = 'Elementary'
    B1 = 'Pre-Intermediate'
    B2 = 'Intermediate'
    C1 = 'Upper-Intermediate'
    C2 = 'Advanced'

    @staticmethod
    def vals():
        return {'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6}

    @staticmethod
    def rev_vals():
        return {1: TestLevel.A1, 2: TestLevel.A2, 3: TestLevel.B1, 4: TestLevel.B2, 5: TestLevel.C1, 6: TestLevel.C2}

    def __ge__(self, other):
        if self.__class__ is other.__class__:
            return TestLevel.get_value(self.name) >= TestLevel.get_value(other.name)
        return NotImplemented

    def __gt__(self, other):
        if self.__class__ is other.__class__:
            return TestLevel.get_value(self.name) > TestLevel.get_value(other.name)
        return NotImplemented

    def __le__(self, other):
        if self.__class__ is other.__class__:
            return TestLevel.get_value(self.name) <= TestLevel.get_value(other.name)
        return NotImplemented

    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return TestLevel.get_value(self.name) < TestLevel.get_value(other.name)
        return NotImplemented

    def __eq__(self, other):
        return str(other).lower() == str(self.name).lower()

    @staticmethod
    def get_value(name):
        return TestLevel.vals()[name]

    @staticmethod
    def get_enum(name):
        if name == TestLevel.A1.name:
            return TestLevel.A1
        elif name == TestLevel.A2.name:
            return TestLevel.A2
        elif name == TestLevel.B1.name:
            return TestLevel.B1
        elif name == TestLevel.B2.name:
            return TestLevel.B2
        elif name == TestLevel.C1.name:
            return TestLevel.C1
        elif name == TestLevel.C2.name:
            return TestLevel.C2


class SpeakingLevel(Enum):
    A1m = 'Beginner-'
    A1p = 'Beginner+'
    A2m = 'Elementary-'
    A2p = 'Elementary+'
    B1m = 'Pre-Intermediate-'
    B1p = 'Pre-Intermediate+'
    B2m = 'Intermediate-'
    B2p = 'Intermediate+'
    C1m = 'Upper-Intermediate-'
    C1p = 'Upper-Intermediate+'
    C2m = 'Advanced-'
    C2p = 'Advanced+'

    @staticmethod
    def vals():
        return {'SpeakingLevel.A1p': 1, 'SpeakingLevel.A2p': 2, 'SpeakingLevel.B1p': 3, 'SpeakingLevel.B2p': 4,
                'SpeakingLevel.C1p': 5, 'SpeakingLevel.C2p': 6, 'SpeakingLevel.A1m': 0.5, 'SpeakingLevel.A2m': 1.5,
                'SpeakingLevel.B1m': 2.5, 'SpeakingLevel.B2m': 3.5, 'SpeakingLevel.C1m': 4.5, 'SpeakingLevel.C2m': 5.5}

    def __ge__(self, other):
        if self.__class__ is other.__class__:
            return SpeakingLevel.get_value(self.name) >= SpeakingLevel.get_value(other.name)
        return NotImplemented

    def __gt__(self, other):
        if self.__class__ is other.__class__:
            return SpeakingLevel.get_value(self.name) > SpeakingLevel.get_value(other.name)
        return NotImplemented

    def __le__(self, other):
        if self.__class__ is other.__class__:
            return SpeakingLevel.get_value(self.name) <= SpeakingLevel.get_value(other.name)
        return NotImplemented

    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return SpeakingLevel.get_value(self.name) < SpeakingLevel.get_value(other.name)
        return NotImplemented

    def __eq__(self, other):
        return str(other).lower() == str(self.name).lower()

    @staticmethod
    def get_value(name):
        return SpeakingLevel.vals()[name]


class Mark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    test_mark = models.IntegerField(default=0)
    test_level = models.CharField(
        max_length=29,
        choices=[(tag.name, tag.value) for tag in TestLevel],
        default=TestLevel.A1)
    removed = models.BooleanField(default=False)
    speaking = models.ForeignKey(TeacherSpeaking, on_delete=models.CASCADE, null=True, blank=True)
    speaking_mark = models.CharField(
        max_length=29,
        choices=[(tag.name, tag.value) for tag in SpeakingLevel],
        default=SpeakingLevel.A1m)
    level = models.CharField(
        max_length=29,
        choices=[(tag.name, tag.value) for tag in TestLevel],
        default=TestLevel.A1)
