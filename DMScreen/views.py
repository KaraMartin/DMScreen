from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def index(request):
    return render(request, 'DMScreen/index.html')


def spells(request):
    return render(request, 'DMScreen/spells.html')

def diceRoller(request):
    return render(request, 'DMScreen/diceRoller.html')