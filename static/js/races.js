$(document).ready(function () {

    $('button').click(function () {
        console.log(this);
        const raceIndex = $(this).attr("value");
        const baseURL = "https://www.dnd5eapi.co/api/races/";
        console.log("Testing..." + raceIndex);

        $.ajax({
            url: baseURL + raceIndex,
            dataType: 'json',
            method: 'GET',
            success: function (result) {
                const raceName = result.name;
                const raceSpeed = result.speed;
                const abilityBonuses = result.ability_bonuses;
                const abilityBonusOptions = result.ability_bonus_options;
                const alignment = result.alignment;
                const age = result.age;
                const size = result.size;
                const sizeDesc = result.size_description;
                const startingProfs = result.starting_proficiencies;
                const startingProfOptions = result.starting_proficiency_options;
                const languages = result.languages;
                const languageOptions = result.language_options;
                const languageDesc = result.language_desc;
                const traits = result.traits;
                const traitOptions = result.trait_options;
                const subraces = result.subraces;

                console.log(raceName);

                let raceHTML = result;

                $('#raceInfo').html( raceHTML );
            }
        });
    });
});