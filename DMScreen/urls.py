from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('spells', views.spells, name="spells"),
    path('races', views.races, name="races"),
    path('classes', views.classes, name="classes"),
    path('monsters', views.monsters, name="monsters"),
    path('dice', views.diceRoller, name="dice"),
]
