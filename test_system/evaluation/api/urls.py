from .views import MarkAPIView, MarkRudView, CountMarksView
from django.urls import re_path, path

app_name = 'api-marks'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', MarkRudView.as_view(), name='mark-rud'),
    path(r'evaluate/', CountMarksView.as_view(), name='mark-count'),
    path(r'', MarkAPIView.as_view(), name='mark-create'),
]
