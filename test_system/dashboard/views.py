from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from django.shortcuts import render

BASE_PATH = 'http://localhost:5000/'

@login_required
def redirect(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'dashboard.html', {})
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')
