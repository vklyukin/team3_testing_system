from django.urls import path
from . import views

app_name = 'api-registration'

urlpatterns = [
    path(r'', views.UserCreate.as_view(), name='account-create'),
]
