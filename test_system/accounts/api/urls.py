from django.urls import path
from . import views

app_name = 'api-registration'

urlpatterns = [
    path('signup/', views.redirect, name='redirect'),
    path('list/', views.StudentListView.as_view(), name='get-student-list'),
    path('', views.UserCreate.as_view(), name='account-create'),
]
