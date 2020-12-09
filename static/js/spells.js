$(document).ready(function () {

    $('button').click(function () {
        const spellIndex = $(this).attr('id');
        const baseURL = "https://www.dnd5eapi.co/api/spells/";

        // Only do this once per spell to minimize JSON requests
        if(!$.trim($("#" + spellIndex + "-desc").html())){
            $.ajax({
                url: baseURL + spellIndex,
                dataType: 'json',
                method: 'GET',
                success: function (result) {
                    const spellName = result.name;
                    const spellDesc = result.desc;
                    let higherLevel;
                    if (result.hasOwnProperty('higher_level')) {
                        higherLevel = result.higher_level[0];
                    }
                    const range = result.range;
                    const components = result.components;
                    const material = result.material;
                    const ritual = result.ritual;
                    const duration = result.duration;
                    const concentration = result.concentration;
                    const castingTime = result.casting_time;
                    const level = result.level;
                    let damageType, damageAmount;
                    if (result.hasOwnProperty('damage')) {
                        damageType = result.damage.damage_type.name;
                        if (result.damage.hasOwnProperty('damage_at_slot_level')) {
                            damageAmount = result.damage.damage_at_slot_level[level];
                        } else if (result.damage.hasOwnProperty('damage_at_character_level')) {
                            damageAmount = result.damage.damage_at_character_level[level];
                        }
                    }
                    let dc, dcSuccess;
                    if (result.hasOwnProperty('dc')) {
                        dc = result.dc.dc_type.name;
                        dcSuccess = result.dc.dc_success;
                    }
                    let AoESize, AoEType;
                    if (result.hasOwnProperty('area_of_effect')) {
                        AoESize = result.area_of_effect.size;
                        AoEType = result.area_of_effect.type;
                    }
                    const school = result.school.name;
                    const classes = result.classes;

                    let spellHTML = '                            ';
                    console.log(spellHTML);
                    spellHTML += '<ul class="list-group list-group-flush">' +
                        '<li class="list-group-item bg-dark border-warning">' +
                        '<h5 class="card-title">Overview</h5>' +
                        '<div class="row"><div class="col-3">Level: ' + level + ' </div>' +
                        '<div class="col-3">Casting Time: ' + castingTime + '</div>';

                    console.log(spellHTML);

                    if(result.hasOwnProperty('area_of_effect')) {
                        spellHTML += '<div class="col-3">Range/Area: ' + range +
                            ' (' + AoESize + 'ft ' + AoEType +  ')</div>';
                    }
                    else {
                        spellHTML += '<div class="col-3">Range: ' + range + '</div>'
                    }

                    spellHTML += '<div class="col-3">Components: ' + components;
                    if(components.includes("M")) {
                        spellHTML += "*";
                    }
                    spellHTML += '</div></div>';

                    spellHTML += '<div class="row"><div class="col-3">Duration: ' + duration + '</div>' +
                        '<div class="col-3">School: ' + school + '</div>';
                    if (result.hasOwnProperty('dc')) {
                        spellHTML += '<div class="col-3">Attack/Save: ' + dc + ' (' + dcSuccess + ')</div>';
                    }
                    if (result.hasOwnProperty('damage')) {
                        spellHTML += '<div class="col-3">Damage: ' + damageAmount + ' (' + damageType + ')</div>';
                    }

                    spellHTML +=  '</div></li><li class="list-group-item bg-dark border-warning">' +
                        '<h5 class="card-title">Description</h5>';

                    let i;
                    for(i = 0; i < result.desc.length; i++) {
                        spellHTML += '<p class="card-text">' + spellDesc[i] + '</p>';
                    }
                    spellHTML += '</li><li class="list-group-item bg-dark border-warning">';

                    if (result.hasOwnProperty('higher_level')) {
                        spellHTML += '<div class="row"><div class="col-12">' +
                            '<span class="font-weight-bold"> At higher levels: </span>' + higherLevel + '</div></div>';
                    }

                    if (components.includes("M")) {
                        spellHTML += '<div class="row"><div class="col-12 font-italic"> * - ( ' + material + ')</div></div>';
                    }
                    spellHTML += '</li></ul>';

                    $('#' + spellIndex + "-desc").html( spellHTML );
                }
            });
        }
    });
});