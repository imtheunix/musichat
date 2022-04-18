from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('entrar', index),
    path('novasala', index),
    path('sala/<str:roomCode>', index),
]