$(document).ready(function () {

    $('button').click(function () {
        console.log($(this).attr('id'));
        const spellIndex = $(this).attr('id');
        const baseURL = "https://www.dnd5eapi.co/api/spells/";

        $.ajax({
            url: baseURL + spellIndex,
            dataType: 'json',
            method: 'GET',
            success: function(result) {
                console.log(Object.keys(result));
                const spellName = result.name;
                const spellDesc = result.desc[0];
                if (result.hasOwnProperty('higher_level')) {
                    const higherLevel = result.higher_level[0];
                }
                const range = result.range;
                const components = result.components;
                const material = result.material;
                const ritual = result.ritual;
                const duration = result.duration;
                const concentration = result.concentration;
                const castingTime = result.casting_time;
                const level = result.level;
                if(result.hasOwnProperty('damage')) {
                    const damageType = result.damage.damage_type.name;
                    const damageAmount = result.damage.damage_at_slot_level[level];
                }
                if (result.hasOwnProperty('dc')) {
                    const dc = result.dc.dc_type.name;
                    const dcSuccess = result.dc.dc_success;
                }
                if (result.hasOwnProperty('area_of_effect')) {
                   const AoESize = result.area_of_effect.size;
                   const AoEType = result.area_of_effect.type;
                }
                const school = result.school.name;
                const classes = result.classes;

                console.log(spellName);
                $('#' + spellIndex + "-desc").html(spellDesc);
            }
        });
    });
});