from django.conf import settings
from django.core.management.base import BaseCommand
from mark_scaler.models import Scaler
from evaluation.models import TestLevel

class Command(BaseCommand):
    def handle(self, *args, **options):
        scale = (
            (TestLevel.A1.name, (0, 10)),
            (TestLevel.A2.name, (11, 20)),
            (TestLevel.B1.name, (21, 30)),
            (TestLevel.B2.name, (31, 49)),
            (TestLevel.C1.name, (50, 60)),
            (TestLevel.C2.name, (61, 65)),
        )
        for name, bounds in scale:
            Scaler.objects.create(lower=bounds[0], upper=bounds[1], level=name)
        
        print("initscale: Test levels initialised")
