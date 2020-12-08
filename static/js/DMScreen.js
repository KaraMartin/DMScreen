$(document).ready(function () {

    $('button').click(function () {
        console.log($(this).attr('id'));
        const spellIndex = $(this).attr('id');
        const baseURL = "https://www.dnd5eapi.co/api/spells/";

        // Only do this once per spell to minimize JSON requests
        if(!$.trim($("#" + spellIndex + "-desc").html())){
            $.ajax({
                url: baseURL + spellIndex,
                dataType: 'json',
                method: 'GET',
                success: function (result) {
                    console.log(Object.keys(result));
                    const spellName = result.name;
                    const spellDesc = result.desc[0];
                    if (result.hasOwnProperty('higher_level')) {
                        var higherLevel = result.higher_level[0];
                    }
                    const range = result.range;
                    const components = result.components;
                    const material = result.material;
                    const ritual = result.ritual;
                    const duration = result.duration;
                    const concentration = result.concentration;
                    const castingTime = result.casting_time;
                    const level = result.level;
                    if (result.hasOwnProperty('damage')) {
                        var damageType = result.damage.damage_type.name;
                        if (result.damage.hasOwnProperty('damage_at_slot_level')) {
                            var damageAmount = result.damage.damage_at_slot_level[level];
                        } else if (result.damage.hasOwnProperty('damage_at_character_level')) {
                            var damageAmount = result.damage.damage_at_character_level[level];
                        }
                    }
                    if (result.hasOwnProperty('dc')) {
                        var dc = result.dc.dc_type.name;
                        var dcSuccess = result.dc.dc_success;
                    }
                    if (result.hasOwnProperty('area_of_effect')) {
                        var AoESize = result.area_of_effect.size;
                        var AoEType = result.area_of_effect.type;
                    }
                    const school = result.school.name;
                    const classes = result.classes;

                    console.log(spellName);
                    let spellHTML = "            " +
                        '<div class="row"><div class="col">Level ' + level + ' ' + school + '</div>' +
                        '<div class="col">Casting Time: ' + castingTime + '</div>';
                    if(result.hasOwnProperty('area_of_effect')) {
                        spellHTML += '<div class="col">Range/Area: ' + range +
                            ' (' + AoESize + 'ft ' + AoEType +  ')</div>';
                    }
                    else {
                        spellHTML += '<div class="col">Range: ' + range + '</div>'
                    }
                    spellHTML += '<div class="col">Components: ' + components + '</div></div';
                    spellHTML += '<div class="row">' + spellDesc + '</div>';

                    $('#' + spellIndex + "-desc").html( spellHTML );
                }
            });
        }
    });
});