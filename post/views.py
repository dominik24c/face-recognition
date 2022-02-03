from pprint import pprint

from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from face_recognition.azure_face_api import fetch_recognized_faces_by_face_api_client
from face_recognition.utils import save_recognized_faces_to_db
from .models import Post
from .serializers import PostSerializer, PostWithRecognizedFaces


def get_posts(queryset) -> Response:
    serializer = PostSerializer(queryset, many=True)
    pprint(serializer.data)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def posts_view(request: Request) -> Response:
    if request.method == 'GET':
        return get_posts(Post.objects.all())
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save(owner=request.user)
            image_url = f'{settings.MEDIA_URL}{post.post_picture}'
            pprint(image_url)
            recognized_faces = fetch_recognized_faces_by_face_api_client(image_url)
            pprint(recognized_faces)
            save_recognized_faces_to_db(recognized_faces, post)
            post.is_recognized = True
            post.save()
            return Response({"message": "Post was created!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_posts_view(request: Request) -> Response:
    if request.method == 'GET':
        return get_posts(Post.objects.filter(owner=request.user))


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_post_edit_view(request: Request, id: int) -> Response:
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        serializer = PostWithRecognizedFaces(post)
        return Response(data=serializer.data, status=status.HTTP_200_OK)