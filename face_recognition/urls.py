from django.urls import path

from .views import add_tag_name_view

urlpatterns = [
    path('tag-name/<int:id>/', add_tag_name_view)
]
