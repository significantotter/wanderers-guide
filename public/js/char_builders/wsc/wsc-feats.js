/* Copyright (C) 2020, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

//------------------------- Processing Feats -------------------------//
function processingFeats(wscStatement, srcStruct, locationID){
    
    if(wscStatement.includes("GIVE-GENERAL-FEAT=")){ // GIVE-GENERAL-FEAT=3[metamagic]
        let value = wscStatement.split('=')[1];
        let optionals = value.match(/^.+?\[(.+?)\]$/);
        if(optionals != null){
            optionals = optionals[1].split(',');
        }
        let level;
        if(value.startsWith('LEVEL')){
            level = wscChoiceStruct.Level;
        } else if(value.startsWith('HALF_LEVEL')){
            level = Math.floor(wscChoiceStruct.Level/2);
        } else {
            level = parseInt(value);
        }
        giveGeneralFeat(srcStruct, locationID, level, optionals);
    }
    else if(wscStatement.includes("GIVE-FEAT=")){ // GIVE-FEAT=3[metamagic]
        let value = wscStatement.split('=')[1];
        let optionals = value.match(/^.+?\[(.+?)\]$/);
        if(optionals != null){
            optionals = optionals[1].split(',');
        }
        let level;
        if(value.startsWith('LEVEL')){
            level = wscChoiceStruct.Level;
        } else if(value.startsWith('HALF_LEVEL')){
            level = Math.floor(wscChoiceStruct.Level/2);
        } else {
            level = parseInt(value);
        }
        giveFeat(srcStruct, locationID, level, optionals);
    }
    else if(wscStatement.includes("GIVE-ANCESTRY-FEAT=")){ // GIVE-ANCESTRY-FEAT=3[metamagic]
        let value = wscStatement.split('=')[1];
        let optionals = value.match(/^.+?\[(.+?)\]$/);
        if(optionals != null){
            optionals = optionals[1].split(',');
        }
        let level;
        if(value.startsWith('LEVEL')){
            level = wscChoiceStruct.Level;
        } else if(value.startsWith('HALF_LEVEL')){
            level = Math.floor(wscChoiceStruct.Level/2);
        } else {
            level = parseInt(value);
        }
        let charTagsArray = [];
        for(let dataTag of wscChoiceStruct.CharTagsArray){
            charTagsArray.push(dataTag.value);
        }
        giveAncestryFeat(srcStruct, locationID, level,
            charTagsArray, optionals);
    }
    else if(wscStatement.includes("GIVE-CLASS-FEAT=")){ // GIVE-CLASS-FEAT=3[metamagic]
        let value = wscStatement.split('=')[1];
        let optionals = value.match(/^.+?\[(.+?)\]$/);
        if(optionals != null){
            optionals = optionals[1].split(',');
        }
        let level;
        if(value.startsWith('LEVEL')){
            level = wscChoiceStruct.Level;
        } else if(value.startsWith('HALF_LEVEL')){
            level = Math.floor(wscChoiceStruct.Level/2);
        } else {
            level = parseInt(value);
        }
        let className = (wscChoiceStruct.ClassDetails.Class != null) ? wscChoiceStruct.ClassDetails.Class.name : null;
        giveClassFeat(srcStruct, locationID, level, className, optionals);
    }
    else if(wscStatement.includes("GIVE-SKILL-FEAT=")){ // GIVE-SKILL-FEAT=3[metamagic]
        let value = wscStatement.split('=')[1];
        let optionals = value.match(/^.+?\[(.+?)\]$/);
        if(optionals != null){
            optionals = optionals[1].split(',');
        }
        let level;
        if(value.startsWith('LEVEL')){
            level = wscChoiceStruct.Level;
        } else if(value.startsWith('HALF_LEVEL')){
            level = Math.floor(wscChoiceStruct.Level/2);
        } else {
            level = parseInt(value);
        }
        giveSkillFeat(srcStruct, locationID, level, optionals);
    } 
    else if(wscStatement.includes("GIVE-FEAT-FROM=")){ // GIVE-FEAT-FROM=Choose a Tradition:feat 1,feat 2,feat 2
        let value = wscStatement.split('=')[1];
        let valueParts = value.split(':');
        let chooseTitle = valueParts[0];
        let customListParts = valueParts[1].split(',');
        giveFeatCustomList(srcStruct, locationID, chooseTitle, customListParts);
    }
    else if(wscStatement.includes("GIVE-FEAT-NAME=")){ // GIVE-FEAT-NAME=Ancestral_Paragon
        let featName = wscStatement.split('=')[1];
        featName = featName.replace(/_/g," ");
        giveFeatByName(srcStruct, featName, locationID);
    }
    else if(wscStatement.includes("HIDE-FEAT-NAME=")){ // HIDE-FEAT-NAME=Ancestral_Paragon
        let featName = wscStatement.split('=')[1];
        featName = featName.replace(/_/g," ");
        hideFeatByName(srcStruct, featName);
    } else {
        displayError("Unknown statement (2-Feat): \'"+wscStatement+"\'");
        statementComplete();
    }

}


////////////////////////////////// Choose Feats /////////////////////////////////////////////

function giveFeatCustomList(srcStruct, locationID, chooseTitle, customList){

    chooseTitle = capitalizeWords(chooseTitle).replace(/( A )/,' a ').replace(/( An )/,' an ');
    displayFeatChoice(
        srcStruct,
        locationID,
        chooseTitle,
        [],
        100,
        [],
        'AUTO_PAGE_LOAD',
        customList
    );

    statementComplete();

}

function giveFeat(srcStruct, locationID, featLevel, optionalTags){

    displayFeatChoice(
        srcStruct,
        locationID,
        "Choose a Feat",
        [],
        featLevel,
        optionalTags
    );

    statementComplete();

}

function giveGeneralFeat(srcStruct, locationID, featLevel, optionalTags){

    displayFeatChoice(
        srcStruct,
        locationID,
        "Choose a General Feat",
        ["General"],
        featLevel,
        optionalTags
    );

    statementComplete();

}

function giveSkillFeat(srcStruct, locationID, featLevel, optionalTags){

    displayFeatChoice(
        srcStruct,
        locationID,
        "Choose a Skill Feat",
        ["Skill"],
        featLevel,
        optionalTags
    );

    statementComplete();

}

function giveAncestryFeat(srcStruct, locationID, featLevel, charTagsArray, optionalTags){
    
    displayFeatChoice(
        srcStruct,
        locationID,
        "Choose an Ancestry Feat",
        charTagsArray,
        featLevel,
        optionalTags
    );

    statementComplete();

}

function giveClassFeat(srcStruct, locationID, featLevel, className, optionalTags){

    // Include sourceCodeSNum at the end for if a code field gives multiple class feats
    let classFeatTabsID = locationID+'-classFeatTabs-'+srcStruct.sourceCodeSNum;
    let containerLocationID = locationID+'-ClassFeatContainer-'+srcStruct.sourceCodeSNum;

    let classTabClass = locationID+'-classFeatClassTab-'+srcStruct.sourceCodeSNum;
    let archetypesTabClass = locationID+'-classFeatArchetypesTab-'+srcStruct.sourceCodeSNum;
    let dedicationTabClass = locationID+'-classFeatDedicationTab-'+srcStruct.sourceCodeSNum;

    $('#'+locationID).append('<div class="tabs is-small is-centered is-marginless"><ul id="'+classFeatTabsID+'" class="builder-tabs classFeatTabs" data-arch-tab-class="'+archetypesTabClass+'"></ul></div>');
    let tabsContent = $('#'+classFeatTabsID);

    tabsContent.append('<li><a class="'+classTabClass+'">'+className+' Class</a></li>');

    let charArchetypesArray = [];
    for(let featChoice of wscChoiceStruct.FeatArray){
        if(featChoice.value != null) {
            let feat = g_featMap.get(featChoice.value.id+"");
            if(feat != null){
                let dedicationTag = feat.Tags.find(featTag => {
                    return featTag.name === 'Dedication';
                });
                if(dedicationTag != null){
                    charArchetypesArray.push(featChoice.value.id);
                }
            }
        }
    }

    for(let charArchetypeDedFeatID of charArchetypesArray){
        let archetype = g_archetypes.find(archetype => {
            return archetype.dedicationFeatID == charArchetypeDedFeatID;
        });
        if(archetype != null){
            tabsContent.append('<li><a class="'+archetypesTabClass+' '+archetypesTabClass+'-'+archetype.name+'" name="'+archetype.name+'">'+archetype.name+' Archetype</a></li>');
        }
    }

    tabsContent.append('<li><a class="'+dedicationTabClass+'">Add Dedication</a></li>');

    $('#'+locationID).append('<div class="py-2" id="'+containerLocationID+'"></div>');

    $('.'+classTabClass).click(function(event, autoPageLoad){
        if (autoPageLoad != 'AUTO_PAGE_LOAD') { autoPageLoad = null; }
        if($(this).parent().hasClass('is-active')) { return; }

        $('#'+containerLocationID).html('');
        $('#'+classFeatTabsID).find('.is-active').removeClass('is-active');
        $(this).parent().addClass('is-active');

        displayFeatChoice(
            srcStruct,
            containerLocationID,
            "Choose a Class Feat",
            [className],
            featLevel,
            optionalTags,
            autoPageLoad
        );

    });

    $('.'+archetypesTabClass).click(function(event, autoPageLoad){
        if (autoPageLoad != 'AUTO_PAGE_LOAD') { autoPageLoad = null; }
        if($(this).parent().hasClass('is-active')) { return; }

        $('#'+containerLocationID).html('');
        $('#'+classFeatTabsID).find('.is-active').removeClass('is-active');
        $(this).parent().addClass('is-active');
        let archetypeName = $(this).attr('name');

        displayFeatChoice(
            srcStruct,
            containerLocationID,
            "Choose an Archetype Feat",
            [archetypeName+' Archetype'],
            featLevel,
            optionalTags,
            autoPageLoad
        );

    });

    $('.'+dedicationTabClass).click(function(){
        if($(this).parent().hasClass('is-active')) { return; }

        $('#'+containerLocationID).html('');
        $('#'+classFeatTabsID).find('.is-active').removeClass('is-active');
        $(this).parent().addClass('is-active');

        displayFeatChoice(
            srcStruct,
            containerLocationID,
            "Choose a Dedication",
            ['Dedication'],
            featLevel,
            optionalTags
        );

    });

    let clickedTab = false;
    let featData = wscChoiceStruct.FeatArray.find(featData => {
        return hasSameSrc(featData, srcStruct);
    });
    if(featData != null && featData.value != null){
        if(charArchetypesArray.includes(featData.value.id)){
            // Click Dedication Tab
            $('.'+dedicationTabClass).trigger("click");
            clickedTab = true;

            // Remove Self-Archetype Tab
            let archetype = g_archetypes.find(archetype => {
                return archetype.dedicationFeatID == featData.value.id;
            });
            if(archetype != null) {
                let selfArchetypeTabClass = archetypesTabClass+'-'+archetype.name;
                $('#'+classFeatTabsID).find('.'+selfArchetypeTabClass).parent().remove();
            }
        } else {
            let feat = g_featMap.get(featData.value.id+"");
            if(feat != null){
                for(let charArchetypeDedFeatID of charArchetypesArray){
                    let archetype = g_archetypes.find(archetype => {
                        return archetype.dedicationFeatID == charArchetypeDedFeatID;
                    });
                    if(archetype != null){
                        let archetypeTag = feat.Tags.find(featTag => {
                            return featTag.name === archetype.name+' Archetype';
                        });
                        if(archetypeTag != null){
                            // Click Archetype Tab
                            $('.'+archetypesTabClass+'-'+archetype.name).trigger("click", ['AUTO_PAGE_LOAD']);
                            clickedTab = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    if(!clickedTab){
        $('.'+classTabClass).trigger("click", ['AUTO_PAGE_LOAD']);
    }

    statementComplete();

}

function displayFeatChoice(srcStruct, locationID, selectionName, tagsArray, featLevel, optionalTags,
        autoPageLoad = 'AUTO_PAGE_LOAD', customList = null) {

    // Make optional tags lowercase
    if(optionalTags != null){
        for (let i = 0; i < optionalTags.length; i++) {
            optionalTags[i] = optionalTags[i].toLowerCase();
        }
    }
    // Make custom list feat names lowercase
    if(customList != null){
        for (let i = 0; i < customList.length; i++) {
            customList[i] = customList[i].toLowerCase();
        }
    }

    let featSelectionArray = [];

    let prevLevel = 100;
    for(const featStruct of g_featMap){
        let feat = featStruct[1];
        if(feat.Feat.level < 1 && customList == null){ continue; }

        let hasCorrectTags = false;
        if(customList == null) {
            let sameOpsTagsArray = [];
            for(let featTag of feat.Tags){
                if(tagsArray.length > 0){
                    if(tagsArray.includes(featTag.name)){
                        hasCorrectTags = true;
                    }
                } else {
                    hasCorrectTags = true;
                }
                if(optionalTags != null){
                    let featTagNameLower = featTag.name.toLowerCase();
                    if(optionalTags.includes(featTagNameLower)){
                        sameOpsTagsArray.push(featTagNameLower);
                    }
                }
            }
            if(optionalTags != null && hasCorrectTags){
                hasCorrectTags = (optionalTags.sort().join(',') === sameOpsTagsArray.sort().join(','));
            }
        } else {
            if(customList.includes(feat.Feat.name.toLowerCase())){
                hasCorrectTags = true;
            }
        }

        if(feat.Feat.level <= featLevel && hasCorrectTags){

            if(feat.Feat.level < prevLevel){
                featSelectionArray.push({NewLevel: feat.Feat.level});
            }

            featSelectionArray.push(feat);

            prevLevel = feat.Feat.level;

        }

    }

    giveFeatSelection(locationID, srcStruct, selectionName, featSelectionArray);

    

}


//////////////////////////////// Give Feat (by Name) ///////////////////////////////////

function giveFeatByName(srcStruct, featName, locationID){
    featName = featName.replace(/_/g," ");
    featName = featName.replace(/’/g,"'");
    let featEntry = null;
    g_featMap.forEach(function(value, key, map){
        if(value.Feat.isArchived === 0) {
            if(value.Feat.name.toUpperCase() === featName){
                featEntry = value;
                return;
            }
        }
    });
    if(featEntry == null){
        displayError("Cannot find feat: \'"+featName+"\'");
        statementComplete();
        return;
    }

    let featCodeSectionID = "featCode-"+locationID+"-"+srcStruct.sourceCodeSNum;
    $('#'+locationID).append('<div id="'+featCodeSectionID+'"></div>');

    featsUpdateWSCChoiceStruct(srcStruct, featEntry.Feat);
    socket.emit("requestFeatChangeByName",
        getCharIDFromURL(),
        {srcStruct, feat : featEntry, featName : featName,
            codeLocationID : featCodeSectionID, isStatement : true });

}

//////////////////////////////// Hide Feat (by Name) ///////////////////////////////////

function hideFeatByName(srcStruct, featName){

    socket.emit("requestFeatHideByName",
        getCharIDFromURL(),
        srcStruct,
        featName);

}

socket.on("returnFeatHideByName", function(){
    statementComplete();
});