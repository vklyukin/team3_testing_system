from .views import TextUploadView, KeysUploadView
from django.urls import re_path, path

app_name = 'api-file-uploader'

urlpatterns = [
    path(r'text/', TextUploadView.as_view(), name='file-text-upload'),
    path(r'keys/', KeysUploadView.as_view(), name='file-keys-upload'),
]
