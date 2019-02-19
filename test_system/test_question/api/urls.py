from .views import TestQuestionAPIView, TestQuestionRudView, TestQuestionReadingView
from django.urls import re_path, path

app_name = 'api-test-question'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', TestQuestionRudView.as_view(), name='test-question-rud'),
    path(r'', TestQuestionAPIView.as_view(), name='test-question-create'),
    re_path(r'^text/(?P<pk>\d+)/$', TestQuestionReadingView.as_view(), name='test-question-text-rud'),
]
