from rest_framework import serializers
from test_question.models import TestQuestion
from test_text.models import ReadingTest


class TeacherQuestionSerializer(serializers.ModelSerializer):
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
            'is_reading'
        ]

    def validate_title(self, value):
        # qs = TestQuestion.objects.filter(title__exact=value)
        # if self.instance:
        #    qs = qs.exclude(pk=self.instance.pk)
        # if qs.exists():
        #    raise serializers.ValidationError("This name has already been used")
        # return value
        return True


class StudentQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestQuestion
        fields = [
            'pk',
            'number',
            'text',
            'answ_option1',
            'answ_option2',
            'answ_option3',
            'answ_option4',
            'is_reading',
        ]
        read_only_fields = ['answ_correct', 'is_reading']

    def validate_title(self, value):
        return True


class StudentQuestionAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = TestQuestion
        fields = [
            'pk',
            'number',
            'is_reading',
        ]
        read_only_fields = [
            'answ_correct',
            'text',
            'answ_option1',
            'answ_option2',
            'answ_option3',
            'answ_option4',
            'is_reading',
        ]


class EmptyQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestQuestion
        fields = []
        read_only_fields = [
            'pk',
            'number',
            'text',
            'answ_correct',
            'answ_option1',
            'answ_option2',
            'answ_option3',
            'answ_option4',
            'is_reading',
        ]

    def validate_title(self, value):
        return True


class CorrectAnswerValidator(object):
    def __call__(self, answ_correct):
        if not 0 <= answ_correct <= 3:
            raise serializers.ValidationError("Correct answer field is out of possible range")


class TestQuestionCreateSerializer(serializers.ModelSerializer):
    number = serializers.IntegerField()
    text = serializers.CharField()
    answ_correct = serializers.IntegerField(validators=[CorrectAnswerValidator()])
    answ_option1 = serializers.CharField()
    answ_option2 = serializers.CharField()
    answ_option3 = serializers.CharField()
    answ_option4 = serializers.CharField()
    is_reading = serializers.BooleanField()

    def create(self, validated_data):
        question = TestQuestion.objects.create(number=validated_data['number'], text=validated_data['text'],
                                               answ_correct=validated_data['answ_correct'],
                                               answ_option1=validated_data['answ_option1'],
                                               answ_option2=validated_data['answ_option2'],
                                               answ_option3=validated_data['answ_option3'],
                                               answ_option4=validated_data['answ_option4'],
                                               is_reading=validated_data['is_reading'])
        return question

    class Meta:
        model = TestQuestion
        fields = [
            'number',
            'text',
            'answ_correct',
            'answ_option1',
            'answ_option2',
            'answ_option3',
            'answ_option4',
            'is_reading'
        ]


class TestQuestionReadingAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingTest
        fields = [
            'pk',
            'text',
        ]


class TestQuestionReading(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance

    class Meta:
        model = ReadingTest
        fields = [
            'text',
        ]


class TestQuestionReadingEmpty(serializers.ModelSerializer):
    class Meta:
        model = ReadingTest
        read_only_fields = [
            'text',
        ]
