from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from student_answer.models import StudentAnswer

BASE_PATH = 'http://localhost:5000/'


@login_required
def redirect(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN:
        return HttpResponseRedirect(BASE_PATH + 'admin/')
    elif qs[0].user_preference == Preference.TEACHER:
        return HttpResponseRedirect(BASE_PATH + 'test_editor/')
    else:
        answers = StudentAnswer.objects.filter(user=request.user)
        if len(answers.exclude(time_started__isnull=True)) > 0:
            return HttpResponseRedirect(BASE_PATH + 'speaking/info/')
        return HttpResponseRedirect(BASE_PATH + 'stream_choose/choose/')
