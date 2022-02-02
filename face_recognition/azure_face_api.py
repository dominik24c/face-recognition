from typing import List

from azure.cognitiveservices.vision.face import FaceClient
from django.conf import settings
from msrest.authentication import CognitiveServicesCredentials

from .exceptions import NotDetectedFacesException


def fetch_recognized_faces_by_face_api_client(image_url: str) -> List[dict]:
    face_client = FaceClient(settings.AZURE_FACE_API_ENDPOINT,
                             CognitiveServicesCredentials(settings.AZURE_FACE_API_KEY))
    response_detected_faces = face_client.face.detect_with_url(
        image_url,
        detection_model='detection_03',
        recognition_model='recognition_04'
    )

    if not response_detected_faces:
        raise NotDetectedFacesException()

    recognized_faces = []
    for detected_face in response_detected_faces:
        face_data = detected_face.face_rectangle
        recognized_faces.append({
            'left': face_data.left,
            'top': face_data.top,
            'width': face_data.width,
            'height': face_data.height
        })

    return recognized_faces



