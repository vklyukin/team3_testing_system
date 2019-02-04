from rest_framework import serializers
from test_question.models import TestQuestion


class TestQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestQuestion
        fields = [
            'pk',
            'number',
            'text',
            'answ_correct',
            'answ_option1',
            'answ_option2',
            'answ_option3',
            'answ_option4',
        ]
        read_only_fields = ['user']

    def validate_title(self, value):
        #qs = TestQuestion.objects.filter(title__exact=value)
        #if self.instance:
        #    qs = qs.exclude(pk=self.instance.pk)
        #if qs.exists():
        #    raise serializers.ValidationError("This name has already been used")
        #return value
        return True
