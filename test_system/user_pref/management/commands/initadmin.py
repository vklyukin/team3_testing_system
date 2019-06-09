from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from user_pref.models import UserPreferences, Preference


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = input()
        email = input()
        password = input()

        admin = User.objects.create_superuser(
            email=email, username=username, password=password)
        admin.is_active = True
        admin.is_admin = True
        admin.save()

        UserPreferences.objects.create(
            user=admin,
            user_preference=Preference.ADMIN.name
        )
