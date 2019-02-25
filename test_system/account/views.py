from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from django.db.models import Q

BASE_PATH = 'http://localhost:5000/'

@login_required
def redirect(request):
    qs = UserPreferences.objects.all()
    qs = qs.filter(Q(user=request.user))
    if qs[0].user_preference == Preference.ADMIN:
        return HttpResponseRedirect(BASE_PATH + 'admin/')
    elif qs[0].user_preference == Preference.TEACHER:
        return HttpResponseRedirect(BASE_PATH + 'test_editor/')
    else:
        return HttpResponseRedirect(BASE_PATH + '')
