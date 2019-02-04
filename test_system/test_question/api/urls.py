from .views import TestQuestionAPIView, TestQuestionRudView
from django.urls import re_path, path

app_name = 'api-test-question'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', TestQuestionRudView.as_view(), name='test-question-rud'),
    path(r'', TestQuestionAPIView.as_view(), name='test-question-create'),
]
