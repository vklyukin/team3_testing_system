from .views import SpeakingAPIView, SpeakingRudView
from django.urls import re_path, path
from . import views

app_name = 'api-speaking'

urlpatterns = [
    re_path(r'^(?P<pk>\d+)/$', SpeakingRudView.as_view(), name='speaking-rud'),
    path(r'', SpeakingAPIView.as_view(), name='speaking-create'),
    path('choose/', views.choose, name='choose'),
    path('info/', views.info, name='info'),
    path('thanks/', views.thanks, name='thanks'),
]
