$(document).ready(function () {

    $('button').click(function () {
        console.log($(this).attr('id'));
        const monsterIndex = $(this).attr('id');
        const baseURL = "https://www.dnd5eapi.co/api/monsters/";

        // Only do this once per spell to minimize JSON requests
        if(!$.trim($("#" + monsterIndex + "-desc").html())){
            $.ajax({
                url: baseURL + monsterIndex,
                dataType: 'json',
                method: 'GET',
                success: function (result) {
                    console.log(Object.keys(result));
                    const name = result.name;
                    const size = result.size;
                    const type = result.type;
                    const subtype = result.subtype;
                    const alignment = result.alignment;
                    const ac = result.armor_class;
                    const hp = result.hit_points;
                    const hd = result.hit_dice;
                    const speed = result.speed;
                    const str = result.strength;
                    const dex = result.dexterity;
                    const con = result.constitution;
                    const int = result.intelligence;
                    const wis = result.wisdom;
                    const cha = result.charisma;
                    const proficiencies = result.proficiencies;

                    const dVulnerabilities = result.damage_vulnerabilities;
                    const dResistances = result.damage_resistances;
                    const dImmunities = result.damage_immunities;
                    const conditionImmunities = result.condition_immunities;

                    const senses = result.senses;
                    const languages = result.languages;
                    const cr = result.challenge_rating;
                    const xp = result.xp;
                    const specialAbilities = result.special_abilities;
                    const actions = result.actions;
                    const legActions = result.legendary_actions;


                    console.log(name);
                    let monsterHTML = '                              ' +
                        // Row 1 Basic info
                        '<ul class="list-group list-group-flush"><li class="list-group-item bg-dark border-warning">' +
                        '   <h5 class="card-title ref-items">Overview</h5>' +
                        '   <div class="row"><div class="col-4">' +
                        '   <p class="card-text">' + size +' '+ type + ', '  +  alignment  + '</p>                      ' +
                        '   <p class="card-text"><span class="font-weight-bold">Armor Class</span> &nbsp' + ac + '</p>  ' +
                        '   <p class="card-text"><span class="font-weight-bold">Hit Points</span> &nbsp' + hp + ' (' + hd + ')</p>' +
                        '   <p class="card-text"><span class="font-weight-bold">Speed</span> &nbsp' + speed["walk"];

                        if(speed["fly"]) {
                            monsterHTML += ", fly " + speed["fly"];
                        }
                        if(speed["swim"]) {
                            monsterHTML += ", swim " + speed["swim"];
                        }
                        monsterHTML += '</p>';

                        for(let key in senses) {
                            if(senses.hasOwnProperty(key)) {
                                monsterHTML += '<p class="card-text">' + key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ") +' &nbsp' + senses[key] + '</p>';
                            }
                        }

                        monsterHTML += '</div><div class="col-2"><p class="card-text"><span class="font-weight-bold">STR </span> &nbsp' + str + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold">DEX </span> &nbsp' + dex + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold">CON </span> &nbsp' + con + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold">INT </span> &nbsp' + int + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold">WIS </span> &nbsp' + wis + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold">CHA </span> &nbsp' + cha + '</p></div>' +

                        '   <div class="col-3"><p class="card-text"><span class="font-weight-bold">Proficiencies</span></p>';
                        for(let i=0; i < proficiencies.length; i++) {
                            monsterHTML += '   <p class="card-text">' +
                                proficiencies[i]["proficiency"]["name"] + ' +' + proficiencies[i]["value"] + '</p>';
                        }

                        monsterHTML += '</div><div class="col-3"><p class="card-text"><span class="font-weight-bold">Challenge Rating </span> ' + cr + '</p>' +
                            '<p class="card-text"><span class="font-weight-bold">XP </span> ' + xp + '</p>' +
                            '<p class="card-text"><span class="font-weight-bold">Languages: </span>' + languages + '</p></div></div></li>';

                        // Row 2 traits
                        monsterHTML += '<li class="list-group-item bg-dark border-warning"><h5 class="card-title ref-items">Special Abilities</h5></li>';

                        // Row 3 Actions
                        monsterHTML += '<li class="list-group-item bg-dark border-warning"><h5 class="card-title ref-items">Actions</h5></li>';

                        // Row 4 Legendary Actions
                        monsterHTML += '<li class="list-group-item bg-dark border-warning"><h5 class="card-title ref-items">Legendary Actions</h5></li>';

                    monsterHTML += '</ul>';

                    $('#' + monsterIndex + "-desc").html( monsterHTML );


                }
            });
        }
    });
});