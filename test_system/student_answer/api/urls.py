from .views import StudentAnswerAPIView, StudentAnswerRudView
from django.urls import re_path, path

app_name = 'api-test-question'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', StudentAnswerRudView.as_view(), name='student-answer-rud'),
    path(r'', StudentAnswerAPIView.as_view(), name='student-answer-create'),
]
