from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from user_pref.models import UserPreferences, Preference
from student_answer.models import StudentAnswer
from test_system import base_path
from users_exam.models import UsersExam
from evaluation.models import Mark
from django.utils.timezone import now, localtime


@login_required
def redirect(request):
    qs = UserPreferences.objects.filter(user=request.user)
    if qs[0].user_preference == Preference.ADMIN:
        return HttpResponseRedirect(base_path.BASE_PATH + 'admin/')
    elif qs[0].user_preference == Preference.TEACHER:
        return HttpResponseRedirect(base_path.BASE_PATH + 'test_editor/')
    else:
        # answers = StudentAnswer.objects.filter(user=request.user)
        userexam = UsersExam.objects.filter(user=request.user)
        if userexam:
            mark = Mark.objects.filter(user=request.user)[0]
            if mark.removed:
                return HttpResponseRedirect(base_path.BASE_PATH + 'speaking/info/')
            if userexam[0].exam.finish < localtime(now()):
                return HttpResponseRedirect(base_path.BASE_PATH + 'speaking/info/')
            answers = StudentAnswer.objects.filter(user=request.user)
            finished = True
            for answer in answers:
                finished &= answer.answer != 32767
            if finished:
                return HttpResponseRedirect(base_path.BASE_PATH + 'speaking/info/')
        return HttpResponseRedirect(base_path.BASE_PATH + 'stream_choose/choose/')
