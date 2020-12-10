from django.shortcuts import render
from django.http import HttpResponse
import requests


# Create your views here.
def index(request):
    return render(request, 'DMScreen/index.html')

def diceRoller(request):
  return render(request, 'DMScreen/diceRoller.html')

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


def races(request):
    index_of_races = f'https://www.dnd5eapi.co/api/races/'
    response = requests.get(index_of_races)
    data = response.json()
    count = data['count']
    results = data['results']
    full_race_info = []
    for result in results:
        race_index = f'https://www.dnd5eapi.co/api/races/{result["index"]}'
        response = requests.get(race_index)
        data = response.json()
        data["imageURL"] = "/static/images/" + result["index"] + ".png"
        full_race_info.append(data)

    if request.method == 'POST':
        race_selection = request.POST.get('race_selection')
        race_info = f'https://www.dnd5eapi.co/api/races/{race_selection}'
        response = requests.get(race_info).json()
        return render(request, 'DMScreen/races.html', {'count': 1, 'races': response})

    else:
        return render(request, 'DMScreen/races.html', {'count': count, 'races': full_race_info})


def classes(request):
    index_of_classes = f'https://www.dnd5eapi.co/api/classes/'
    response = requests.get(index_of_classes)
    data = response.json()
    count = data['count']
    results = data['results']

    descriptions = {"barbarian": "A fierce warrior of primitive background who can enter a battle rage.",
                    "bard": "An inspiring magician whose power echoes the music of creation.",
                    "cleric": "A priestly champion who wields divine magic in service of a higher power.",
                    "druid": "A priest of the Old Faith, wielding the powers of nature — moonlight and plant growth, fire and lightning — and adopting animal forms.",
                    "fighter": "A master of martial combat, skilled with a variety of weapons and armor.",
                    "monk": "A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.",
                    "paladin": "A holy warrior bound to a sacred oath.",
                    "ranger": "A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.",
                    "rogue": "A scoundrel who uses stealth and trickery to overcome obstacles and enemies.",
                    "sorcerer": "A spellcaster who draws on inherent magic from a gift or bloodline.",
                    "warlock": "A wielder of magic that is derived from a bargain with an extraplanar entity.",
                    "wizard": "A scholarly magic-user capable of manipulating the structures of reality."};

    for result in results:
        result["desc"] = descriptions[result["index"]]

    if request.method == 'POST':
        class_selection = request.POST.get('class_selection')
        class_info = f'https://www.dnd5eapi.co/api/classes/{class_selection}'
        response = requests.get(class_info).json()
        print(response)
        response["desc"] = descriptions[response["index"]]
        return render(request, 'DMScreen/classes.html', {'count': 1, 'classes': response})

    else:
        return render(request, 'DMScreen/classes.html', {'count': count, 'classes': results})


def monsters(request):
    index_of_monsters = f'https://www.dnd5eapi.co/api/monsters/'
    response = requests.get(index_of_monsters)
    data = response.json()
    count = data['count']
    results = data['results']

    if request.method == 'POST':
        search_term = request.POST.get('monster_name').lower()
        matches = []
        for result in results:
            if search_term in result["name"].lower():
                monster_info = f'https://www.dnd5eapi.co/api/monsters/{result["index"]}'
                response = requests.get(monster_info)
                matches.append(response.json())
        return render(request, 'DMScreen/monsters.html', {'monsters': matches})

    else:
        return render(request, 'DMScreen/monsters.html', {'monsters': results})
