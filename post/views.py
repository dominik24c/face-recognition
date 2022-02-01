from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def posts_api_view(request: Request) -> Response:
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            Post.objects.create(**serializer.validated_data, owner=request.user)
            return Response({"message": "Post was created!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
