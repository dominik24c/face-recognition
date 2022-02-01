from django.urls import path

from .views import posts_api_view

urlpatterns = [
    path('posts/', posts_api_view),
]
