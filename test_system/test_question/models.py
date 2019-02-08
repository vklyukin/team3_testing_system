from django.conf import settings
from django.db import models


class TestQuestion(models.Model):
    """Default class for test questions with multichoice"""

    number = models.IntegerField()
    text = models.TextField()
    answ_correct = models.IntegerField()
    answ_option1 = models.TextField()
    answ_option2 = models.TextField()
    answ_option3 = models.TextField()
    answ_option4 = models.TextField()

    def __str__(self):
        res = f"({self.number}) {self.text}\n"

        answers = [
            self.answ_option1,
            self.answ_option2,
            self.answ_option3,
            self.answ_option4,
        ]

        for i in range(len(answers)):
            if i == self.answ_correct:
                res += "[x] "
            else:
                res += "[ ] "
            res += answers[i] + '\n'
        return res

    def __repr__(self):
        return self.__str__()
