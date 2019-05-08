from .views import StudentAnswerAPIView, StudentAnswerRudView, redirect, finish_test
from django.urls import re_path, path

app_name = 'api-student-answer'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', StudentAnswerRudView.as_view(), name='student-answer-rud'),
    path('test/', redirect, name='redirect'),
    path('finish/', finish_test, name='finish-exam'),
    path(r'', StudentAnswerAPIView.as_view(), name='student-answer-create'),
]
