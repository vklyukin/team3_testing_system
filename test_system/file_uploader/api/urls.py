from .views import TextUploadView, KeysUploadView, redirect, FileUserCreate, redirect_add
from django.urls import re_path, path

app_name = 'api-file-uploader'

urlpatterns = [
    path(r'text/', TextUploadView.as_view(), name='file-text-upload'),
    path(r'keys/', KeysUploadView.as_view(), name='file-keys-upload'),
    path(r'students/', FileUserCreate.as_view(), name='file-students-upload'),
    path('student/', redirect_add, name='redirect_add'),
    path('', redirect, name='redirect'),
]
