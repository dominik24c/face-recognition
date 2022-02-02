class FaceApiAzureException(Exception):
    """Main exception for face api client"""
    pass


class NotDetectedFacesException(FaceApiAzureException):
    """Throw if you don't detect faces on the image."""
    pass
