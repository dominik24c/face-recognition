from functools import wraps
from typing import List, TypedDict

from azure.cognitiveservices.vision.face import FaceClient
from azure.cognitiveservices.vision.face.models._models_py3 import DetectedFace
from django.conf import settings
from msrest.authentication import CognitiveServicesCredentials

from .exceptions import NotDetectedFacesException


class FaceDimensions(TypedDict):
    left: int
    top: int
    width: int
    height: int


def face_api_client(func) -> callable:
    @wraps(func)
    def wrap_function(*args, **kwargs):
        client = FaceClient(settings.AZURE_FACE_API_ENDPOINT,
                            CognitiveServicesCredentials(settings.AZURE_FACE_API_KEY))
        return func(client, *args, **kwargs)

    return wrap_function


def fetch_recognized_faces(client: FaceClient, image_url: str) -> list:
    response_detected_faces = client.face.detect_with_url(
        image_url,
        detection_model='detection_03',
        recognition_model='recognition_04'
    )

    if not response_detected_faces:
        raise NotDetectedFacesException()
    return response_detected_faces


def get_face_dimensions(detected_face: DetectedFace) -> FaceDimensions:
    face_rect = detected_face.face_rectangle
    return {
        'left': face_rect.left,
        'top': face_rect.top,
        'width': face_rect.width,
        'height': face_rect.height
    }


@face_api_client
def fetch_recognized_faces_by_face_api_client(client: FaceClient, image_url: str) -> List[FaceDimensions]:
    response_detected_faces = fetch_recognized_faces(client, image_url)
    recognized_faces = []
    for detected_face in response_detected_faces:
        face_data = get_face_dimensions(detected_face)
        recognized_faces.append(face_data)

    return recognized_faces
