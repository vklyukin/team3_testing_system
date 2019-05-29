"""test_system URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.urls import path
from django.contrib import admin
from django.views.generic import TemplateView
from account import views
from django.conf.urls import handler404


urlpatterns = [
    path('', views.redirect, name='redirect'),
    url(r'^admin/', admin.site.urls),
    url(r'^exam/', include('exam.urls')),
    url(r'^api-auth/', include('rest_framework.urls')),
    path('api/question/', include('test_question.api.urls', namespace='api-test-question')),
    path('test_editor/', include('test_editor.urls', namespace='test-editor')),
    path('dashboard/', include('dashboard.urls', namespace='dashboard')),
    path('api/file_uploader/', include('file_uploader.api.urls', namespace='api-file-uploader')),
    path('api/preferences/', include('user_pref.api.urls', namespace='api-user-preferences')),
    path('api/answer/', include('student_answer.api.urls', namespace='api-student-answer')),
    path('api/time/', include('api_time.urls', namespace='api-time')),
    path('api/exam/', include('exam.api.urls', namespace='api-exam')),
    path('api/user-exam/', include('users_exam.api.urls', namespace='api-user-exam')),
    path('test_system/', include('student_answer.api.urls', namespace='api-student-answer')),
    path('account/', include('account.urls', namespace='account')),
    path('api/registration/', include('accounts.api.urls', namespace='api-registration')),
    path('api/mark/', include('evaluation.api.urls', namespace='api-marks')),
    path('stream_choose/', include('users_exam.api.urls', namespace='api-user-exam')),
    path('api/scaler/', include('mark_scaler.api.urls', namespace='api-scaler')),
    path('api/speaking/', include('speaking_queue.api.urls', namespace='api-speaking')),
    path('api/room/', include('room.api.urls', namespace='api-room')),
    path('speaking/', include('speaking_queue.api.urls', namespace='api-speaking')),
    path('tmp/test_system/', TemplateView.as_view(template_name='tmp_test_system.html')),
    path('tmp/stream_choose/', TemplateView.as_view(template_name='tmp_stream_choose.html')),
    path('tmp/room_choose/', TemplateView.as_view(template_name='tmp_room_choose.html')),
]

handler404 = 'dashboard.views.error_404_view'
