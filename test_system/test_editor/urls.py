from django.urls import re_path, path
from django.views.generic import TemplateView

app_name = 'test-editor'

urlpatterns = [
    path('', TemplateView.as_view(template_name="test_editor.html")),
    path('test_editor.js', TemplateView.as_view(template_name="test_editor.js")),
]

