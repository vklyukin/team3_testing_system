from django.urls import re_path, path
from django.views.generic import TemplateView
from . import views

app_name = 'test-editor'

urlpatterns = [
    path('', views.redirect, name='redirect'),
    path('add/', views.redirect_add, name='redirect_add'),
]
