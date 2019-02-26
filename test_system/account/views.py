from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference

BASE_PATH = 'http://localhost:5000/'

@login_required
def redirect(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN:
        return HttpResponseRedirect(BASE_PATH + 'admin/')
    elif qs[0].user_preference == Preference.TEACHER:
        return HttpResponseRedirect(BASE_PATH + 'test_editor/')
    else:
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/')
