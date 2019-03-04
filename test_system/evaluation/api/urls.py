from .views import MarkAPIView, MarkRudView, CountMarksView, StudentsByRoom
from django.urls import re_path, path

app_name = 'api-marks'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', MarkRudView.as_view(), name='mark-rud'),
    path(r'evaluate/', CountMarksView.as_view(), name='mark-count'),
    path(r'by_room/', StudentsByRoom.as_view(), name='student-by-room'),
    path(r'', MarkAPIView.as_view(), name='mark-create'),
]
