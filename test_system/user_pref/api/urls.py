from .views import UserPreferenceAPIView, UserPreferenceRudView
from django.urls import re_path, path

app_name = 'api-user-preference'

urlpatterns = [
    # re_path(r'^(?P<userID>\d+)/$', UserPreferenceRudView.as_view(), name='user-preference-rud'),
    path(r'', UserPreferenceAPIView.as_view(), name='user-preference-create'),
]