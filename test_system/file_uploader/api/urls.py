from .views import TextUploadView, KeysUploadView, redirect, FileUserCreate
from django.urls import re_path, path

app_name = 'api-file-uploader'

urlpatterns = [
    path(r'text/', TextUploadView.as_view(), name='file-text-upload'),
    path(r'keys/', KeysUploadView.as_view(), name='file-keys-upload'),
    path(r'students/', FileUserCreate.as_view(), name='file-students-upload'),
    path('', redirect, name='redirect'),
]
