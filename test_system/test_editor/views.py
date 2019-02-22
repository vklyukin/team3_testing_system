from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from django.db.models import Q
from django.shortcuts import render

@login_required
def redirect(request):
    qs = UserPreferences.objects.all()
    qs = qs.filter(Q(user=request.user))
    if qs[0].user_preference == Preference.ADMIN or qs[0].user_preference == Preference.TEACHER:
        return render(request, 'test_editor.html', {})
    else:
        return HttpResponseRedirect('http://localhost:5000/')
