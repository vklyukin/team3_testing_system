from .views import ScalerAPIView, ScalerRudView, redirect
from django.urls import re_path, path

app_name = 'api-scaler'

urlpatterns = [
    path('edit/', redirect, name='redirect'),
    re_path(r'^(?P<pk>\d+)/$', ScalerRudView.as_view(), name='scaler-rud'),
    path(r'', ScalerAPIView.as_view(), name='scaler-create'),

]
