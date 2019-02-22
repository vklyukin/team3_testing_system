from django.urls import re_path, path
from django.views.generic import TemplateView
from . import views

app_name = 'test-editor'

urlpatterns = [
    path('', views.redirect, name='redirect'),
    path('add/', TemplateView.as_view(template_name="add_question.html")),
]
