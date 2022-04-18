from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom

urlpatterns = [
    path('sala', RoomView.as_view()),
    path('novasala', CreateRoomView.as_view()),
    path('puxarsala', GetRoom.as_view()),
]
