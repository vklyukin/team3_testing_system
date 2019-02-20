from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response
from django.utils.timezone import now, localtime


class TimeView(APIView):
    def get(self, request):
        response = {'time': localtime(now())}
        return Response(response, status=HTTP_200_OK)
