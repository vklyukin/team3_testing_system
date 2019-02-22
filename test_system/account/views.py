from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from django.db.models import Q

@login_required
def redirect(request):
    qs = UserPreferences.objects.all()
    qs = qs.filter(Q(user=request.user))
    if qs[0].user_preference == Preference.ADMIN:
        return HttpResponseRedirect('http://localhost:5000/admin/')
    elif qs[0].user_preference == Preference.TEACHER:
        return HttpResponseRedirect('http://localhost:5000/test_editor/')
    else:
        return HttpResponseRedirect('http://localhost:5000/')
