from .views import StudentAnswerAPIView, StudentAnswerRudView, redirect
from django.urls import re_path, path

app_name = 'api-student-answer'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', StudentAnswerRudView.as_view(), name='student-answer-rud'),
    path(r'', StudentAnswerAPIView.as_view(), name='student-answer-create'),
    path('test/', redirect, name='redirect'),
]
