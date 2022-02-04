from pprint import pprint

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import RecognizedFace
from .serializers import RecognizedFaceSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_tag_name_view(request: Request, id) -> Response:
    if request.method == 'POST':
        print(request.data)
        serializer = RecognizedFaceSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data)
            user = User.objects.prefetch_related('posts__recognized_faces').filter(
                posts__recognized_faces__id=id).first()
            pprint(user)
            if user == request.user:
                pprint("was saved")
                face = RecognizedFace.objects.get(id=id)
                face.tag_name = serializer.data.get('tag_name')
                face.save()
                return Response({"message": "Tag name was saved for this recognized face!",
                                 "tag_name": face.tag_name,
                                 "id": id},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "You can edit only own post!"})
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
