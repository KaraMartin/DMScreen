$(document).ready(function () {

    $('button').click(function () {
        const classIndex = $(this).attr('id');
        const baseURL = "https://www.dnd5eapi.co/api/races/";

        $.ajax({
            url: baseURL + classIndex,
            dataType: 'json',
            method: 'GET',
            success: function (result) {
                const name = result.name;
                const hitDie = result.hit_die;
                const profChoices = result.proficiency_choices;
                const profenciencies = result.proficiencies;
                const savingThrows = result.saving_throws;
                const subclasses = result.subclasses;
                const spellcasting = result.spellcasting;
                const spells = result.spells;
                const startingEquipment = result.starting_equipment;
                const classLevels = result.class_levels;


                console.log(className);

                let classHTML = result;

                $('#classInfo').html( classHTML );
            }
        });
    });
});