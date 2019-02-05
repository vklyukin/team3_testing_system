from .views import UserPreferenceAPIView
from django.urls import re_path, path

app_name = 'api-user-preference'

urlpatterns = [
    path(r'', UserPreferenceAPIView.as_view(), name='user-preference-create'),
]
