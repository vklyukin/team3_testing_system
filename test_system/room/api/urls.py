from .views import RoomAPIView, RoomRudView
from django.urls import re_path, path

app_name = 'api-room'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', RoomRudView.as_view(), name='room-rud'),
    path(r'', RoomAPIView.as_view(), name='room-create'),
]