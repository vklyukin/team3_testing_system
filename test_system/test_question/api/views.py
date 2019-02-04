from rest_framework import generics, mixins
from test_question.models import TestQuestion
from .serializers import TestQuestionSerializer
from django.db.models import Q
from .permissions import IsOwnerOrReadOnly
#from rest_framework_simplejwt import authentication


class TestQuestionAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    lookup_field = 'pk'
    serializer_class = TestQuestionSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = TestQuestion.objects.all()
        return qs


class TestQuestionRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'
    serializer_class = TestQuestionSerializer
    permission_classes = [IsOwnerOrReadOnly]
    
    def get_queryset(self):
        return TestQuestion.objects.all()
