from django.urls import re_path, path
from django.views.generic import TemplateView
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.redirect, name='redirect'),
]
