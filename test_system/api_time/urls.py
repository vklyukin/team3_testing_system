from .views import TimeView
from django.urls import path

app_name = 'api-time'

urlpatterns = [
    path(r'', TimeView.as_view(), name='get-time'),
]