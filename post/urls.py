from django.urls import path

from .views import posts_view, user_posts_view, user_post_edit_view

urlpatterns = [
    path('posts/', posts_view),
    path('user-posts/', user_posts_view),
    path('user-posts/<int:id>/', user_post_edit_view),
]
