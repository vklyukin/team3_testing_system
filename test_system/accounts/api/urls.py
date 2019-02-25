from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name = 'api-registration'

urlpatterns = [
    path('signup/', views.redirect, name='redirect'),
    path('', views.UserCreate.as_view(), name='account-create'),
]
