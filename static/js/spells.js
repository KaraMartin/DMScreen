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
                        '<h5 class="card-title text-warning">Overview</h5>' +
                        '<div class="row"><div class="col-3"><span class="font-weight-bold text-info">Level </span>' + level + ' </div>' +
                        '<div class="col-3"><span class="font-weight-bold text-info">Casting Time</span> ' + castingTime + '</div>';

                    console.log(spellHTML);

                    if(result.hasOwnProperty('area_of_effect')) {
                        spellHTML += '<div class="col-3"><span class="font-weight-bold text-info">Range/Area</span> ' + range +
                            ' (' + AoESize + 'ft ' + AoEType +  ')</div>';
                    }
                    else {
                        spellHTML += '<div class="col-3"><span class="font-weight-bold text-info">Range</span> ' + range + '</div>'
                    }

                    spellHTML += '<div class="col-3"><span class="font-weight-bold text-info">Components</span> ' + components;
                    if(components.includes("M")) {
                        spellHTML += "*";
                    }
                    spellHTML += '</div></div>';

                    spellHTML += '<div class="row"><div class="col-3"><span class="font-weight-bold text-info">Duration</span> ' + duration + '</div>' +
                        '<div class="col-3"><span class="font-weight-bold text-info">School</span> ' + school + '</div>';
                    if (result.hasOwnProperty('dc')) {
                        spellHTML += '<div class="col-3"><span class="font-weight-bold text-info">Attack/Save</span> ' + dc + ' (' + dcSuccess + ')' + '</div>'
                    }
                    if (result.hasOwnProperty('damage')) {
                        spellHTML += '<div class="col-3"><span class="font-weight-bold text-info">Damage</span> ' + damageAmount + ' (' + damageType + ')</div>';
                    }

                    spellHTML +=  '</div></li><li class="list-group-item bg-dark border-warning">' +
                        '<h5 class="card-title text-warning">Description</h5>';

                    let i;
                    for(i = 0; i < result.desc.length; i++) {
                        spellHTML += '<p class="card-text">' + spellDesc[i] + '</p>';
                    }

                    if (result.hasOwnProperty('higher_level') || components.includes("M")) {
                        spellHTML += '</li><li class="list-group-item bg-dark border-warning">';
                        if(result.hasOwnProperty('higher_level')){
                            spellHTML += '<div class="row"><div class="col-12">' +
                                '<span class="font-weight-bold text-info"> At higher levels - </span>' + higherLevel + '</div></div>';
                        }
                        if (components.includes("M")) {
                            spellHTML += '<div class="row"><div class="col-12 font-italic text-info"> * - ( ' + material + ')</div></div>';
                        }
                    }
                    spellHTML += '</li></ul>';

                    $('#' + spellIndex + "-desc").html( spellHTML );
                }
            });
        }
    });
});