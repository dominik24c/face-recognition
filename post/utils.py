import pathlib
import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions


def post_image_upload_handler(instance, filename):
    file_path = pathlib.Path(filename)
    prefix_filename = str(uuid.uuid4())
    return f'posts/{prefix_filename}_{file_path.suffix}'


def validate_image(image_file):
    filesize = image_file.size
    if not settings.MIN_UPLOAD_SIZE < filesize < settings.MAX_UPLOAD_SIZE:
        raise ValidationError(f"The image size should be between {settings.MIN_UPLOAD_SIZE}B "
                              f"and {settings.MAX_UPLOAD_SIZE}B!")

    width, height = get_image_dimensions(image_file)
    if not (settings.MIN_WIDTH < width < settings.MAX_WIDTH):
        raise ValidationError(f'The image width should be between {settings.MIN_WIDTH} '
                              f'and {settings.MAX_WIDTH}')

    if not (settings.MIN_HEIGHT < height < settings.MAX_HEIGHT):
        raise ValidationError(f'The image height should be between {settings.MIN_HEIGHT} '
                              f'and {settings.MAX_HEIGHT}')
