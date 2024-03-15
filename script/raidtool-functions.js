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
        'Beastmaster Hunter': 0,
        'Assassin Rogue': 0,
        'Combat Rogue': 0,
        'Sublety Rogue': 0

    };
    let classCount2 = {
        'enhancement-shaman': 0,
        'elemental-shaman': 0,
        'restoration-shaman': 0,
        'retribution-paladin': 0,
        'holy-paladin': 0,
        'protection-paladin': 0,
        'fury-warrior': 0,
        'arms-warrior': 0,
        'protection-warrior': 0,
        'marksman-hunter': 0,
        'survival-hunter': 0,
        'beastmaster-hunter': 0,
        'assassination-rogue': 0,
        'combat-rogue': 0,
        'subtlety-rogue': 0,
        'balance-druid': 0,
        'feral-druid': 0,
        'restoration-druid': 0,
        'affliction-warlock': 0,
        'demonology-warlock': 0,
        'destruction-warlock': 0,
        'fire-mage': 0,
        'arcane-mage': 0,
        'frost-mage': 0,
        'shadow-priest': 0,
        'discipline-priest': 0,
        'holy-priest': 0,
        'frost-death-knight': 0,
        'unholy-death-knight': 0,
        'blood-death-knight': 0
    };
    let playerRoles = {
        'Tank': 0,
        'Healer': 0,
        'Melee DPS': 0,
        'Ranged DPS': 0
    }
    let gearTypes = {
        'Cloth': 0,
        'Leather': 0,
        'Mail': 0,
        'Plate': 0
    }
    let tierTokens = {
        'Conqueror': 0,
        'Protector': 0,
        'Vanquisher': 0
    }
    function updateCounts() {
        // Oppdaterer spillerroller
        let playerRolesHtml = '';
        for (const [role, count] of Object.entries(playerRoles)) {
            playerRolesHtml += `<div>${role}: ${count}</div>`;
        }
        $('#player-counts').html(playerRolesHtml);
    
        // Oppdaterer utstyrstyper
        let gearTypesHtml = '';
        for (const [type, count] of Object.entries(gearTypes)) {
            gearTypesHtml += `<div>${type}: ${count}</div>`;
        }
        $('#gear-types').html(gearTypesHtml);
    
        // Oppdaterer tier tokens
        let tierTokensHtml = '';
        for (const [token, count] of Object.entries(tierTokens)) {
            tierTokensHtml += `<div>${token}: ${count}</div>`;
        }
        $('#tier-tokens').html(tierTokensHtml);
    }
    
    // Funksjon for å legge til en klasse
    function addClass(className) {
        // Definer klasser og deres egenskaper
        const classProperties = {
            'elemental-shaman': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'restoration-shaman': { role: 'Healer', gearType: 'Mail', tierToken: 'Protector' },
            'enhancement-shaman': { role: 'Melee DPS', gearType: 'Mail', tierToken: 'Protector' },
            'retribution-paladin': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Conqueror' },
            'holy-paladin': { role: 'Healer', gearType: 'Plate', tierToken: 'Conqueror' },
            'protection-paladin': { role: 'Tank', gearType: 'Plate', tierToken: 'Conqueror' },
            'fury-warrior': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Protector' },
            'arms-warrior': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Protector' },
            'protection-warrior': { role: 'Tank', gearType: 'Plate', tierToken: 'Protector' },
            'marksman-hunter': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'survival-hunter': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'beastmaster-hunter': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'assassination-rogue': { role: 'Melee DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'combat-rogue': { role: 'Melee DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'subtlety-rogue': { role: 'Melee DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'balance-druid': { role: 'Ranged DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'feral-druid': { role: 'Tank', gearType: 'Leather', tierToken: 'Vanquisher' },
            'restoration-druid': { role: 'Healer', gearType: 'Leather', tierToken: 'Vanquisher' },
            'affliction-warlock': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'demonology-warlock': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'destruction-warlock': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'fire-mage': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Vanquisher' },
            'arcane-mage': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Vanquisher' },
            'frost-mage': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Vanquisher' },
            'shadow-priest': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'discipline-priest': { role: 'Healer', gearType: 'Cloth', tierToken: 'Conqueror' },
            'holy-priest': { role: 'Healer', gearType: 'Cloth', tierToken: 'Conqueror' },
            'frost-death-knight': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Vanquisher' },
            'unholy-death-knight': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Vanquisher' },
            'blood-death-knight': { role: 'Tank', gearType: 'Plate', tierToken: 'Vanquisher' }
            // Legg til flere klasser her etter behov
        };
    
        // Sjekk om klassen er definert
        if (classProperties[className]) {
            const properties = classProperties[className];
            // Oppdater spillerroller, utstyrstyper og tier tokens
            playerRoles[properties.role]++;
            gearTypes[properties.gearType]++;
            tierTokens[properties.tierToken]++;
    
            // Oppdater visningen
            updateCounts();
        }
    }
    
    // Funksjon for å fjerne en klasse
    function removeClass(className) {
        // Definer klasser og deres egenskaper
        const classProperties = {
            'elemental-shaman': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'restoration-shaman': { role: 'Healer', gearType: 'Mail', tierToken: 'Protector' },
            'enhancement-shaman': { role: 'Melee DPS', gearType: 'Mail', tierToken: 'Protector' },
            'retribution-paladin': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Conqueror' },
            'holy-paladin': { role: 'Healer', gearType: 'Plate', tierToken: 'Conqueror' },
            'protection-paladin': { role: 'Tank', gearType: 'Plate', tierToken: 'Conqueror' },
            'fury-warrior': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Protector' },
            'arms-warrior': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Protector' },
            'protection-warrior': { role: 'Tank', gearType: 'Plate', tierToken: 'Protector' },
            'marksman-hunter': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'survival-hunter': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'beastmaster-hunter': { role: 'Ranged DPS', gearType: 'Mail', tierToken: 'Protector' },
            'assassination-rogue': { role: 'Melee DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'combat-rogue': { role: 'Melee DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'subtlety-rogue': { role: 'Melee DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'balance-druid': { role: 'Ranged DPS', gearType: 'Leather', tierToken: 'Vanquisher' },
            'feral-druid': { role: 'Tank', gearType: 'Leather', tierToken: 'Vanquisher' },
            'restoration-druid': { role: 'Healer', gearType: 'Leather', tierToken: 'Vanquisher' },
            'affliction-warlock': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'demonology-warlock': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'destruction-warlock': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'fire-mage': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Vanquisher' },
            'arcane-mage': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Vanquisher' },
            'frost-mage': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Vanquisher' },
            'shadow-priest': { role: 'Ranged DPS', gearType: 'Cloth', tierToken: 'Conqueror' },
            'discipline-priest': { role: 'Healer', gearType: 'Cloth', tierToken: 'Conqueror' },
            'holy-priest': { role: 'Healer', gearType: 'Cloth', tierToken: 'Conqueror' },
            'frost-death-knight': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Vanquisher' },
            'unholy-death-knight': { role: 'Melee DPS', gearType: 'Plate', tierToken: 'Vanquisher' },
            'blood-death-knight': { role: 'Tank', gearType: 'Plate', tierToken: 'Vanquisher' }
            // Legg til flere klasser her etter behov
        };
    
        // Sjekk om klassen er definert
        if (classProperties[className]) {
            const properties = classProperties[className];
            // Oppdater spillerroller, utstyrstyper og tier tokens
            playerRoles[properties.role]--;
            gearTypes[properties.gearType]--;
            tierTokens[properties.tierToken]--;
    
            // Oppdater visningen
            updateCounts();
        }
    }

    // Objekt for å holde styr på spesifikke klasser valg som shouts og blessings
    let classChoices = {};

    for (let i = 1; i <= 25; i++) {
        $('<div class="raid-slot">' + i + '</div>').click(function () {
            const classToRemove = $(this).data('class');
            const classSlugRemove = classToRemove.replace(/\s+/g, '-').toLowerCase()
            if (classToRemove) {
                removeClassChoices(classToRemove);
                classCount[classToRemove]--;
                classCount2[classSlugRemove]--;
                removeClass(classSlugRemove);
                $(this).removeData('class').empty().append(i);
                updateClassOptions();
                updateBuffs();
                console.log(classCount2)
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
                classCount2[classSlug]++;
                addClass(classSlug);
                updateClassOptions();
                updateBuffs();
                console.log(classCount2)
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