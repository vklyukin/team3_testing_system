from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from django.shortcuts import render

BASE_PATH = 'http://localhost:5000/'

@login_required
def home(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'dashboard.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')

@login_required
def manage(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'exam_manage.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')

@login_required
def stream_edit(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'stream-settings.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')

@login_required
def add_exam(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'add-exam.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')

@login_required
def room_edit(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'room_edit.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')

@login_required
def speaking(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'speaking.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')
