
function hasCriticalSpecialization(item){
    if(item.WeaponData != null){
        return hasWeaponCriticalSpecialization(item);
    } else if(item.ArmorData != null){
        return hasArmorSpecialization(item);
    } else {
        return false;
    }
}

function hasWeaponCriticalSpecialization(item){
    let itemName = item.Item.name.toUpperCase().replace(/’/g,"'");
    let itemCategory = item.WeaponData.category.toUpperCase();

    for(const weapCriticalData of g_specializationStruct.WeapCriticals){
        if(weapCriticalData.value.startsWith('TRAIT~')){
            let traitName = weapCriticalData.value.replace(/TRAIT\~/g,'');

            let tagStruct = item.TagArray.find(tagStruct => {
                return traitName == tagStruct.Tag.name.toUpperCase();
            });

            if(tagStruct != null){
                return true;
            }
    
        } else if(weapCriticalData.value.startsWith('WEAPON~')){
            let weapName = weapCriticalData.value.replace(/WEAPON\~/g,'');
            
            if(weapName == itemName){
                return true;
            }
    
        } else {
    
            if(weapCriticalData.value.includes(itemCategory)){
                return true;
            }
    
        }
    }
    return false;
}

function hasArmorSpecialization(item){
    let itemName = item.Item.name.toUpperCase().replace(/’/g,"'");
    let itemCategory = item.ArmorData.category.toUpperCase();

    for(const armorCriticalData of g_specializationStruct.ArmorSpecial){
        if(armorCriticalData.value.startsWith('TRAIT~')){
            let traitName = armorCriticalData.value.replace(/TRAIT\~/g,'');

            let tagStruct = item.TagArray.find(tagStruct => {
                return traitName == tagStruct.Tag.name.toUpperCase();
            });

            if(tagStruct != null){
                return true;
            }
    
        } else if(armorCriticalData.value.startsWith('ARMOR~')){
            let armorName = armorCriticalData.value.replace(/ARMOR\~/g,'');
            
            if(armorName == itemName){
                return true;
            }
    
        } else {

            if(armorCriticalData.value.includes(itemCategory)){
                return true;
            }
    
        }
    }
    return false;
}

function displayCriticalSpecialization(qContent, item){

    if(hasCriticalSpecialization(item)){

        qContent.append(criticalSpecializationText(item));
        qContent.append('<hr class="m-2">');

    }

}




let g_critSpecialTextMap = new Map();

g_critSpecialTextMap.set('LEATHER', 'The thick second skin of the armor disperses blunt force to reduce bludgeoning damage. You gain resistance to bludgeoning damage equal to 1 + the value of the armor’s potency rune for medium armor, or 2 + the value of the armor’s potency rune for heavy armor.');
g_critSpecialTextMap.set('COMPOSITE', 'The numerous overlapping pieces of this armor protect you from piercing attacks. You gain resistance to piercing damage equal to 1 + the value of the armor’s potency rune for medium armor, or 2 + the value of the armor’s potency rune for heavy armor.');
g_critSpecialTextMap.set('PLATE', 'The sturdy plate provides no purchase for a cutting edge. You gain resistance to slashing damage equal to 1 + the value of the armor’s potency rune for medium armor, or 2 + the value of the armor’s potency rune for heavy armor.');
g_critSpecialTextMap.set('CHAIN', 'The armor is so flexible it can bend with a critical hit and absorb some of the blow. Reduce the damage from critical hits by either 4 + the value of the armor’s potency rune for medium armor, or 6 + the value of the armor’s potency rune for heavy armor. This can’t reduce the damage to less than the damage rolled for the hit before doubling for a critical hit.');

g_critSpecialTextMap.set('SWORD', 'The target is made off-balance by your attack, becoming flat-footed until the start of your next turn.');
g_critSpecialTextMap.set('SPEAR', 'The weapon pierces the target, weakening its attacks. The target is clumsy 1 until the start of your next turn.');
g_critSpecialTextMap.set('SHIELD', 'You knock the target back from you 5 feet. This is forced movement.');
g_critSpecialTextMap.set('POLEARM', 'The target is moved 5 feet in a direction of your choice. This is forced movement.');
g_critSpecialTextMap.set('PICK', 'The weapon viciously pierces the target, who takes 2 additional damage per weapon damage die.');
g_critSpecialTextMap.set('KNIFE', 'The target takes 1d6 persistent bleed damage. You gain an item bonus to this bleed damage equal to the weapon’s item bonus to attack rolls.');
g_critSpecialTextMap.set('HAMMER', 'The target is knocked prone.');
g_critSpecialTextMap.set('FLAIL', 'The target is knocked prone.');
g_critSpecialTextMap.set('CLUB', 'You knock the target away from you up to 10 feet (you choose the distance). This is forced movement.');
g_critSpecialTextMap.set('BRAWLING', 'The target must succeed at a Fortitude save against your class DC or be slowed 1 until the end of your next turn.');
g_critSpecialTextMap.set('BOMB', 'Increase the radius of the bomb’s splash damage (if any) to 10 feet.');
g_critSpecialTextMap.set('AXE', 'Choose one creature adjacent to the initial target and within reach. If its AC is lower than your attack roll result for the critical hit, you deal damage to that creature equal to the result of the weapon damage die you rolled (including extra dice from its striking rune, if any). This amount isn’t doubled, and no bonuses or other additional dice apply to this damage.');

g_critSpecialTextMap.set('SLING', 'The target must succeed at a Fortitude save against your class DC or be stunned 1.');
g_critSpecialTextMap.set('DART', 'The target takes 1d6 persistent bleed damage. You gain an item bonus to this bleed damage equal to the weapon’s item bonus to attack rolls.');
g_critSpecialTextMap.set('BOW', 'If the target of the critical hit is adjacent to a surface, it gets stuck to that surface by the missile. The target is immobilized and must spend an (action: Interact) action to attempt a DC 10 Athletics check to pull the missile free; it can’t move from its space until it succeeds. The creature doesn’t become stuck if it is incorporeal, is liquid (like a water elemental or some oozes), or could otherwise escape without effort.');


function criticalSpecializationText(item){

    let text = null;
    let isArmor = false;
    if(item.ArmorData != null){
        isArmor = true;
        text = g_critSpecialTextMap.get(item.ArmorData.armorType);
    }

    if(item.WeaponData != null){
        isArmor = false;
        if(item.WeaponData.isMelee == 1){
            text = g_critSpecialTextMap.get(item.WeaponData.meleeWeaponType);
        }
        if(item.WeaponData.isRanged == 1){
            text = g_critSpecialTextMap.get(item.WeaponData.rangedWeaponType);
        }
    }

    if(text != null){
        if(isArmor){
            return '<p class="has-text-centered"><strong>Armor Specialization</strong></p>'+processText(text, true, true, 'MEDIUM');
        } else {
            return '<p class="has-text-centered"><strong>Critical Specialization Effect</strong></p>'+processText(text, true, true, 'MEDIUM');
        }
    }
    return null;

}