from django.urls import re_path, path
from django.views.generic import TemplateView
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('home/', views.home, name='home'),
    path('manage/', views.manage, name='manage'),
    path('stream_edit/', views.stream_edit, name='stream_edit'),
    path('add_exam/', views.add_exam, name='add_exam'),
    path('room_edit/', views.room_edit, name='room_edit'),
    path('speaking/', views.speaking, name='speaking'),
]
