from rest_framework import generics, mixins
from user_pref.models import UserPreferences
from .serializers import UserPreferenceSerializer
from .permissions import IsOwnerPrefReadOnly
from django.db.models import Q


class UserPreferenceAPIView(mixins.CreateModelMixin, generics.ListAPIView):
    serializer_class = UserPreferenceSerializer
    permission_classes = [IsOwnerPrefReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            qs = UserPreferences.objects.all()
            qs = qs.filter(Q(user=self.request.user))
            return qs
        return []
