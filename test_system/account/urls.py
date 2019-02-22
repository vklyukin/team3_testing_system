from django.conf.urls import url, include
from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('login_redirect/', views.redirect, name='redirect'),
]
