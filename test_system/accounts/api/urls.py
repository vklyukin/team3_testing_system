from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name = 'api-registration'

urlpatterns = [
    path('signup/', TemplateView.as_view(template_name="signup.html")),
    path('', views.UserCreate.as_view(), name='account-create'),
]
