from django.shortcuts import render
from django.http import HttpResponse
import requests


# Create your views here.
def index(request):
    return render(request, 'DMScreen/index.html')


def spells(request):
    index_of_spells = f'https://www.dnd5eapi.co/api/spells/'
    response = requests.get(index_of_spells)
    data = response.json()
    count = data['count']
    results = data['results']

    if request.method == 'POST':
        search_term = request.POST.get('spell_name').lower()
        matches = []
        for result in results:
            if search_term in result["name"].lower():
                spell_info = f'https://www.dnd5eapi.co/api/spells/{result["index"]}'
                response = requests.get(spell_info)
                matches.append(response.json())
        return render(request, 'DMScreen/spells.html', {'spells': matches})
    else:
        return render(request, 'DMScreen/spells.html', {'spells': results})
