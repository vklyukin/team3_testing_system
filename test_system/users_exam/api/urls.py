from .views import UsersExamAPIView, UsersExamRUDView, redirect
from django.urls import re_path, path

app_name = 'api-user-exam'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', UsersExamRUDView.as_view(), name='user-exam-rud'),
    path(r'', UsersExamAPIView.as_view(), name='user-exam-create'),
    path('choose/', redirect, name='redirect'),
]
