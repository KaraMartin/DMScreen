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



                    console.log(name);
                    let monsterHTML = '                              ' +
                        // Row 1 Basic info
                        '<ul class="list-group list-group-flush"><li class="list-group-item bg-dark border-warning">' +
                        '   <h5 class="card-title ref-items text-warning">Overview</h5>' +
                        '   <div class="row"><div class="col-4">' +
                        '   <p class="card-text">' + size +' '+ type + ', '  +  alignment  + '</p>                      ' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">Armor Class</span> &nbsp' + ac + '</p>  ' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">Hit Points</span> &nbsp' + hp + ' (' + hd + ')</p>' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">Speed</span> &nbsp' + speed["walk"];

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

                        monsterHTML += '</div><div class="col-2"><p class="card-text"><span class="font-weight-bold text-info">STR </span> &nbsp' + str + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">DEX </span> &nbsp' + dex + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">CON </span> &nbsp' + con + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">INT </span> &nbsp' + int + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">WIS </span> &nbsp' + wis + '</p>' +
                        '   <p class="card-text"><span class="font-weight-bold text-info">CHA </span> &nbsp' + cha + '</p></div>' +

                        '   <div class="col-3"><p class="card-text"><span class="font-weight-bold text-info">Proficiencies</span></p>';
                        for(let i=0; i < proficiencies.length; i++) {
                            monsterHTML += '   <p class="card-text">' +
                                proficiencies[i]["proficiency"]["name"] + ' +' + proficiencies[i]["value"] + '</p>';
                        }

                        monsterHTML += '</div><div class="col-3"><p class="card-text"><span class="font-weight-bold text-info">Challenge Rating </span> ' + cr + '</p>' +
                            '<p class="card-text"><span class="font-weight-bold text-info">XP </span> ' + xp + '</p>' +
                            '<p class="card-text"><span class="font-weight-bold text-info">Languages: </span>' + languages + '</p></div></div></li>';

                        // Row 2 traits
                        if(result.hasOwnProperty('special_abilities')) {
                            const specialAbilities = result.special_abilities;
                            monsterHTML += '<li class="list-group-item bg-dark border-warning"><h5 class="card-title ref-items text-warning">Special Abilities</h5>';

                            for (let i = 0; i < specialAbilities.length; i++) {
                                monsterHTML += '<p class="card-text"><span class="font-weight-bold text-info">' + specialAbilities[i]["name"] + ':</span> ' +
                                    specialAbilities[i].desc;
                                if (specialAbilities[i].hasOwnProperty("usage")) {
                                    monsterHTML += '(' + specialAbilities[i]["usage"]["times"] + '&nbsp;' + specialAbilities[i]["usage"]["type"] + ')';
                                }
                                monsterHTML += '</p>';
                            }
                            monsterHTML += '</li>';
                        }

                        // Row 3 Actions
                        if(result.hasOwnProperty('actions')) {
                            const actions = result.actions;
                            monsterHTML += '<li class="list-group-item bg-dark border-warning"><h5 class="card-title ref-items text-warning">Actions</h5>';
                            for (let i = 0; i < actions.length; i++) {
                                monsterHTML += '<p class="card-text"><span class="font-weight-bold text-info">' + actions[i]["name"] + ':</span> ' +
                                    actions[i].desc;
                                if (actions[i].hasOwnProperty("usage")) {
                                    monsterHTML += '(' + actions[i]["usage"]["times"] + '&nbsp;' + actions[i]["usage"]["type"] + ')';
                                }
                                monsterHTML += '</p>';
                            }
                            monsterHTML += '</li>';
                        }

                        // Row 4 Legendary Actions
                        if(result.hasOwnProperty('legendary_actions')) {
                            const legActions = result.legendary_actions;

                            monsterHTML += '<li class="list-group-item bg-dark border-warning"><h5 class="card-title ref-items text-warning">Legendary Actions</h5>';
                            for (let i = 0; i < legActions.length; i++) {
                                monsterHTML += '<p class="card-text"><span class="font-weight-bold text-info">' + legActions[i]["name"] + ':</span> ' +
                                    legActions[i].desc;
                            if(legActions[i].hasOwnProperty("usage")) {
                                monsterHTML += '(' + legActions[i]["usage"]["times"] + '&nbsp;' + legActions[i]["usage"]["type"] + ')';
                            }
                            monsterHTML += '</p>';
                            }
                            monsterHTML += '</li>';
                        }
                    monsterHTML += '</ul>';
                    $('#' + monsterIndex + "-desc").html( monsterHTML );
                }
            });
        }
    });
});