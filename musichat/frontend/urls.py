from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('entrar', index),
    path('novasala', index),
    path('sala/<str:roomCode>', index),
]