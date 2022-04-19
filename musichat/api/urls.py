from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, UpdateRoom

urlpatterns = [
    path('sala', RoomView.as_view()),
    path('novasala', CreateRoomView.as_view()),
    path('puxarsala', GetRoom.as_view()),
    path('entrar-sala', JoinRoom.as_view()),
    path('usario-em-sala', UserInRoom.as_view()),
    path('sair-da-sala', LeaveRoom.as_view()),
    path('atualizar-sala', UpdateRoom.as_view()),
]
