$(function () {
    updateBuffs();
    let classCount = {
        'Enhancement Shaman': 0,
        'Elemental Shaman': 0,
        'Restoration Shaman': 0,
        'Retribution Paladin': 0,
        'Holy Paladin': 0,
        'Protection Paladin': 0,
        'Fury Warrior': 0,
        'Arms Warrior': 0,
        'Protection Warrior': 0,
        'Marksman Hunter': 0,
        'Survival Hunter': 0,
        'Beastmaster Hunter': 0

    };
    

    // Objekt for å holde styr på spesifikke klasser valg som shouts og blessings
    let classChoices = {};

    for (let i = 1; i <= 25; i++) {
        $('<div class="raid-slot">' + i + '</div>').click(function () {
            const classToRemove = $(this).data('class');
            if (classToRemove) {
                removeClassChoices(classToRemove);
                classCount[classToRemove]--;
                $(this).removeData('class').empty().append(i);
                updateClassOptions();
                updateBuffs();
            }
        }).appendTo('#raid-slots');
    }


    // Funksjon for å fjerne valgene for en klasse fra classChoices
    function removeClassChoices(className) {
        Object.keys(classChoices).forEach(function (key) {
            if (key.startsWith(className.replace(' ', '-'))) {
                delete classChoices[key];
            }
        });

        // Oppdater grensesnittet her hvis nødvendig
        // For eksempel, tilbakestill select-elementene for den aktuelle klassen
        resetClassInterface(className);
    }

    // Funksjon for å tilbakestille grensesnittet for en spesifikk klasse
    function resetClassInterface(className) {
        // Implementer logikken for å tilbakestille grensesnittet her
        // Dette kan innebære å tilbakestille select-elementer eller andre UI-komponenter
        // Eksempel:
        $(`.class-container[data-class="${className}"] select`).val('');
    }

    $(".class-container").click(function () {
        const classToAdd = $(this).data('class');
        const classSlug = classToAdd.replace(/\s+/g, '-').toLowerCase(); // Konverterer klassenavn til en klasse-slug, f.eks. "Elemental Shaman" til "elemental-shaman"
        $('.raid-slot').each(function () {
            if (!$(this).data('class')) {
                $(this).data('class', classToAdd)
                    .empty()
                    .append($('<div>').addClass('class-container-cloned ' + classSlug).text(classToAdd)); // Legger til den spesifikke fargeklassen
                classCount[classToAdd]++;
                updateClassOptions();
                updateBuffs();
                return false;
            }
        });
    });

    function updateClassOptions() {
        $('#class-options-list').empty();

        Object.keys(classCount).forEach((key) => {
            for (let i = 0; i < classCount[key]; i++) {
                if (key.includes('Shaman')) {
                    addShamanOptions(key, i);
                } else if (key.includes('Paladin')) {
                    addPaladinOptions(key, i);
                } else if (key.includes('Warrior')) {
                    addWarriorOptions(key, i);
                } else if (key.includes('Hunter')) {
                    addHunterOptions(key, i);
                }
            }
        });
    }

    function addHunterOptions(className, index) {
        let hunterId = className.replace(' ', '-') + '-' + index;
        let optionsHtml = `<div>${className} ${index + 1} Pets:</div>`;
        optionsHtml += `<select class="hunter-pet" data-hunter-id="${hunterId}">
                <option value="">Select Pet</option>
                <option value="Wolf">Wolf 5% Crit Buff</option>
                <option value="Cat">Cat Strength and Agility Buff</option>
                <option value="Serpent">Serpent/Raptor Armor Debuff</option>
                <option value="Bear">Bear/Carrion Bird -10% physical damage output debuff</option>
                <option value="Tallstrider">Tallstrider/Fox -20% melee haste debuff</option>
                <option value="Dragonhawk">Dragonhawk/Wind Serpent +8% magic damage debuff</option>
                <option value="Ravager">Ravager +4% physical damage debuff</option>
                <option value="Sporebat">Sporebat Cast Speed debuff</option>
                <option value="Hyena">Hyena +30% bleed damage debuff</option>
            </select><br>`;
        $('#class-options-list').append(optionsHtml);

        // Legg til event listener for å oppdatere classChoices når et pet er valgt
        $(`.hunter-pet[data-hunter-id="${hunterId}"]`).change(function () {
            let petChoice = $(this).val();
            classChoices[hunterId + '-pet'] = petChoice;
            console.log('Updated classChoices:', classChoices); // For feilsøking
            updateBuffs(); // Oppdater buffs basert på valgt pet, hvis nødvendig
        });
    }


    function addShamanOptions(className, index) {
        let shamanId = className.replace(' ', '-') + '-' + index; // Unik ID for hver Shaman
        let optionsHtml = `<div>${className} ${index + 1} Totems:</div>`;
        // Definerer totemvalg for hver type
        optionsHtml += `<select class="shaman-totem" data-shaman-id="${shamanId}" data-totem-type="air">
                <option value="">Select Air Totem</option>
                <option value="Windfury Totem">Windfury Totem</option>
                <option value="Wrath of Air Totem">Wrath of Air Totem</option>
            </select><br>`;
        optionsHtml += `<select class="shaman-totem" data-shaman-id="${shamanId}" data-totem-type="earth">
                <option value="">Select Earth Totem</option>
                <option value="Strength of Earth Totem">Strength of Earth Totem</option>
                <option value="Stoneskin Totem">Stoneskin Totem</option>
            </select><br>`;
        optionsHtml += `<select class="shaman-totem" data-shaman-id="${shamanId}" data-totem-type="water">
                <option value="">Select Water Totem</option>
                <option value="Totem of Tranquil Mind">Totem of Tranquil Mind</option>
                <option value="Mana Spring Totem">Mana Spring Totem</option>
                <option value="Elemental Resistance Totem">Elemental Resistance Totem</option>
            </select><br>`;
        optionsHtml += `<select class="shaman-totem" data-shaman-id="${shamanId}" data-totem-type="fire">
                <option value="">Select Fire Totem</option>
                <option value="Flametongue Totem">Flametongue Totem</option>
            </select><br>`;
        $('#class-options-list').append(optionsHtml);

        // Legger til event listeners for Shaman totem valg
        $(`.shaman-totem[data-shaman-id="${shamanId}"]`).change(function () {
            let totemType = $(this).data('totem-type');
            classChoices[shamanId + '-' + totemType] = $(this).val();
            console.log('Updated classChoices:', classChoices); // Legg til for feilsøking
            updateBuffs();
        });
    }

    function addPaladinOptions(className, index) {
        let paladinId = className.replace(' ', '-') + '-' + index; // Unik ID for hver Paladin
        let optionsHtml = `<div>${className} ${index + 1} Choices:</div>`;
        // Legger til data-paladin-id for å unikt identifisere select elementene
        optionsHtml += `<select class="paladin-blessing" data-paladin-id="${paladinId}" data-choice-type="blessing">
                <option value="">Select Blessing</option>
                <option value="Blessing of Might">Blessing of Might</option>
                <option value="Blessing of Kings">Blessing of Kings</option>
            </select><br>`;
        optionsHtml += `<select class="paladin-aura" data-paladin-id="${paladinId}" data-choice-type="aura">
                <option value="">Select Aura</option>
                <option value="Devotion Aura">Devotion Aura</option>
                <option value="Resistance Aura">Resistance Aura</option>
                <option value="Concentration Aura">Concentration Aura</option>
            </select><br>`;
        $('#class-options-list').append(optionsHtml);

        // Legger til event listeners for Paladin valg
        $(`.paladin-blessing[data-paladin-id="${paladinId}"], .paladin-aura[data-paladin-id="${paladinId}"]`).change(function () {
            let choiceType = $(this).data('choice-type');
            classChoices[paladinId + '-' + choiceType] = $(this).val();
            updateBuffs();
        });
    }

    function addWarriorOptions(className, index) {
        let warriorId = className.replace(' ', '-') + '-' + index;
        let optionsHtml = `<div>${className} ${index + 1} Shouts:</div>`;
        optionsHtml += `<select class="warrior-choice" data-warrior-id="${warriorId}">
                    <option value="">Select Shout</option>
                    <option value="Battle Shout">Battle Shout</option>
                    <option value="Commanding Shout">Commanding Shout</option>
                 </select><br>`;
        $('#class-options-list').append(optionsHtml);

        // Add event listener for changes in warrior choice
        $(`.warrior-choice[data-warrior-id="${warriorId}"]`).change(function () {
            classChoices[warriorId] = $(this).val();
            updateBuffs();
        });
    }

    function updateBuffs() {
        $("#buff-list li").css("color", "red"); // Reset color
        $("#debuff-list li").css("color", "red");

        $('.raid-slot').each(function () {
            const classInSlot = $(this).data('class');
            if (classInSlot === 'Feral Druid') {
                $('#buff-crit').css('color', 'green');
                $('#buff-allstats').css('color', 'green');
                $('#buff-combatres').css('color', 'green');
                $('#buff-spellres').css('color', 'green');
                $('#buff-manaregenmajor').css('color', 'green');
                $('#debuff-armor').css('color', 'green');
                $('#debuff-bleed').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
            }
            if (classInSlot === 'Balance Druid') {
                $('#buff-allstats').css('color', 'green');
                $('#buff-combatres').css('color', 'green');
                $('#buff-spellhaste').css('color', 'green');
                $('#buff-spellres').css('color', 'green');
                $('#buff-manaregenmajor').css('color', 'green');
                $('#debuff-armor').css('color', 'green');
                $('#debuff-magic-dmg').css('color', 'green');
            }
            if (classInSlot === 'Restoration Druid') {
                $('#buff-allstats').css('color', 'green');
                $('#buff-combatres').css('color', 'green');
                $('#buff-spellres').css('color', 'green');
                $('#buff-manaregenmajor').css('color', 'green');
                $('#debuff-armor').css('color', 'green');
            }
            if (classInSlot === 'Frost Death Knight') {
                $('#buff-atkspeed').css('color', 'green');
                $('#buff-stragil').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
                $('#debuff-phys-dmg').css('color', 'green');

            }
            if (classInSlot === 'Unholy Death Knight') {
                $('#buff-stragil').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
                $('#debuff-magic-dmg').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Blood Death Knight') {
                $('#buff-atkpwr').css('color', 'green');
                $('#buff-stragil').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Affliction Warlock') {
                $('#buff-maxmana').css('color', 'green');
                $('#buff-combatres').css('color', 'green');
                $('#buff-mp5').css('color', 'green');
                $('#debuff-magic-dmg').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Demonology Warlock') {
                $('#buff-spellpwr').css('color', 'green');
                $('#buff-combatres').css('color', 'green');
                $('#debuff-magic-dmg').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Destruction Warlock') {
                $('#buff-stamina').css('color', 'green');
                $('#buff-combatres').css('color', 'green');
                $('#buff-manaregenminor').css('color', 'green');
                $('#debuff-spellcrit').css('color', 'green');
                $('#debuff-magic-dmg').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Survival Hunter') {
                $('#buff-atkspeed').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
            }
            if (classInSlot === 'Marksman Hunter') {
                $('#buff-atkpwr').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
            }
            if (classInSlot === 'Beastmaster Hunter') {
                $('#buff-alldmg').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
            }
            if (classInSlot === 'Fire Mage') {
                $('#buff-spellpwr2').css('color', 'green');
                $('#buff-maxmana').css('color', 'green');
                $('#buff-majorhaste').css('color', 'green');
                $('#debuff-spellcrit').css('color', 'green');
            }
            if (classInSlot === 'Arcane Mage') {
                $('#buff-spellpwr2').css('color', 'green');
                $('#buff-alldmg').css('color', 'green');
                $('#buff-maxmana').css('color', 'green');
                $('#buff-majorhaste').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Frost Mage') {
                $('#buff-spellpwr2').css('color', 'green');
                $('#buff-maxmana').css('color', 'green');
                $('#buff-majorhaste').css('color', 'green');
                $('#buff-manaregenminor').css('color', 'green');
            }
            if (classInSlot === 'Shadow Priest') {
                $('#buff-spellhaste').css('color', 'green');
                $('#buff-stamina').css('color', 'green');
                $('#buff-manaregenminor').css('color', 'green');
                $('#buff-manaregenmajor').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
                $('#buff-shadowres').css('color', 'green');
            }
            if (classInSlot === 'Holy Priest') {
                $('#buff-stamina').css('color', 'green');
                $('#buff-manaregenmajor').css('color', 'green');
                $('#buff-shadowres').css('color', 'green');
            }
            if (classInSlot === 'Discipline Priest') {
                $('#buff-stamina').css('color', 'green');
                $('#buff-manaregenmajor').css('color', 'green');
                $('#buff-shadowres').css('color', 'green');
            }
            if (classInSlot === 'Arms Warrior') {
                $('#debuff-armor').css('color', 'green');
                $('#debuff-bleed').css('color', 'green');
                $('#debuff-phys-dmg').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
            }
            if (classInSlot === 'Protection Warrior') {
                $('#debuff-armor').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
            }
            if (classInSlot === 'Fury Warrior') {
                $('#buff-crit').css('color', 'green');
                $('#debuff-armor').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
            }
            if (classInSlot === 'Assassination Rogue') {
                $('#debuff-armor').css('color', 'green');
                $('#debuff-magic-dmg').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Combat Rogue') {
                $('#debuff-armor').css('color', 'green');
                $('#debuff-phys-dmg').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Subtlety Rogue') {
                $('#buff-crit').css('color', 'green');
                $('#debuff-armor').css('color', 'green');
                $('#debuff-bleed').css('color', 'green');
                $('#debuff-healing').css('color', 'green');
                $('#debuff-castspeed').css('color', 'green');
            }
            if (classInSlot === 'Protection Paladin') {
                $('#debuff-melee-haste').css('color', 'green');
                $('#debuff-phys-output').css('color', 'green');
            }
            if (classInSlot === 'Retribution Paladin') {
                $('#buff-alldmg').css('color', 'green');
                $('#buff-manaregenminor').css('color', 'green');
            }
            if (classInSlot === 'Holy Paladin') {
            }
            if (classInSlot === 'Elemental Shaman') {
                $('#buff-crit').css('color', 'green');
                $('#buff-spellpwr').css('color', 'green');
                $('#buff-majorhaste').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
            }
            if (classInSlot === 'Enhancement Shaman') {
                $('#buff-atkpwr').css('color', 'green');
                $('#buff-majorhaste').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
            }
            if (classInSlot === 'Restoration Shaman') {
                $('#buff-majorhaste').css('color', 'green');
                $('#debuff-melee-haste').css('color', 'green');
            }
            Object.keys(classChoices).forEach(choice => {
                //WARRIOR
                if (classChoices[choice] === 'Battle Shout' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-stragil').css('color', 'green'); // Assumes 'stragil' is a placeholder for the actual buff
                } else if (classChoices[choice] === 'Commanding Shout' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-stamina').css('color', 'green'); // Assumes 'stamina' is a placeholder for the actual buff
                }
                if (classChoices[choice] === 'Blessing of Might' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-atkpwr').css('color', 'green');
                    $('#buff-mp5').css('color', 'green');
                } else if (classChoices[choice] === 'Blessing of Kings' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-allstats').css('color', 'green');
                    $('#buff-spellres').css('color', 'green');
                }
                //PALADIN
                if (classChoices[choice] === 'Devotion Aura' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-armor').css('color', 'green');
                } else if (classChoices[choice] === 'Resistance Aura' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-shadowres').css('color', 'green');
                    $('#buff-fireres').css('color', 'green');
                    $('#buff-frostres').css('color', 'green');
                } else if (classChoices[choice] === 'Concentration Aura' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-spellpushback').css('color', 'green');
                }
                //SHAMAN
                // Sjekker og håndterer Air Totem valg
                if (classChoices[choice] === 'Windfury Totem' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-atkspeed').css('color', 'green');
                } else if (classChoices[choice] === 'Wrath of Air Totem' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-spellhaste').css('color', 'green');
                }

                // Sjekker og håndterer Earth Totem valg
                if (classChoices[choice] === 'Strength of Earth Totem' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-stragil').css('color', 'green'); // Anta at dette representerer både styrke og smidighet
                } else if (classChoices[choice] === 'Stoneskin Totem' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-armor').css('color', 'green');
                }

                // Sjekker og håndterer Water Totem valg
                if (classChoices[choice] === 'Totem of Tranquil Mind' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-spellpushback').css('color', 'green');
                } else if (classChoices[choice] === 'Mana Spring Totem' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-mp5').css('color', 'green');
                } else if (classChoices[choice] === 'Elemental Resistance Totem' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-fireres').css('color', 'green');
                    $('#buff-natureres').css('color', 'green');
                    $('#buff-frostres').css('color', 'green');
                }

                // Sjekker og håndterer Fire Totem valg
                if (classChoices[choice] === 'Flametongue Totem' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-spellpwr2').css('color', 'green'); // Anta at dette representerer en økning i spell power
                }

                // Hunterpets
                if (classChoices[choice] === 'Wolf' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-crit').css('color', 'green');
                } else if (classChoices[choice] === 'Cat' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#buff-stragil').css('color', 'green');
                } else if (classChoices[choice] === 'Serpent' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#debuff-armor').css('color', 'green');
                } else if (classChoices[choice] === 'Bear' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#debuff-phys-output').css('color', 'green');
                } else if (classChoices[choice] === 'Tallstrider' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#debuff-melee-haste').css('color', 'green');
                } else if (classChoices[choice] === 'Dragonhawk' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#debuff-magic-dmg').css('color', 'green');
                } else if (classChoices[choice] === 'Ravager' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#debuff-phys-dmg').css('color', 'green');
                } else if (classChoices[choice] === 'Sporebat' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#debuff-castspeed').css('color', 'green');
                } else if (classChoices[choice] === 'Hyena' && choice.startsWith(classInSlot.replace(' ', '-'))) {
                    $('#debuff-bleed').css('color', 'green');
                }
            });

            // Add conditions for other classes and buffs
        });
    }

})