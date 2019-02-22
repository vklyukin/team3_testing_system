from django.conf.urls import url, include
from django.urls import path

app_name = 'account'

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
]
