from .views import ExamSessionAPIView, ExamSessionRUDView
from django.urls import re_path, path

app_name = 'api-exam'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', ExamSessionRUDView.as_view(), name='exam-rud'),
    path(r'', ExamSessionAPIView.as_view(), name='exam-create'),
]
