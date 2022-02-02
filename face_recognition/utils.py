from itertools import islice
from pprint import pprint
from typing import List

from post.models import Post
from .models import RecognizedFace


def save_recognized_faces_to_db(recognized_faces: List[dict], post: Post) -> None:
    faces = (RecognizedFace(**recognized_face, post=post) for recognized_face in recognized_faces)
    batch_size = 20
    while True:
        batch = list(islice(faces, batch_size))
        if not batch:
            break
        RecognizedFace.objects.bulk_create(batch, batch_size)
