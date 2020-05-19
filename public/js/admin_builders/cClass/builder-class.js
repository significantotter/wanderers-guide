
let socket = io();

// ~~~~~~~~~~~~~~ // Run on Load // ~~~~~~~~~~~~~~ //
$(function () {

    
    $("#inputWeaponsTrained").change(function(){
        let weapNames = '- ';
        $(this).find(":selected").each(function(){
            weapNames += $(this).text()+', ';
        });
        $("#selectedWeaponTrained").html(weapNames);
    });

    $("#inputWeaponsExpert").change(function(){
        let weapNames = '- ';
        $(this).find(":selected").each(function(){
            weapNames += $(this).text()+', ';
        });
        $("#selectedWeaponExpert").html(weapNames);
    });

    $("#inputArmorTrained").change(function(){
        let armorNames = '- ';
        $(this).find(":selected").each(function(){
            armorNames += $(this).text()+', ';
        });
        $("#selectedArmorTrained").html(armorNames);
    });
    

    $("#inputKeyAbility").change(function(){
        if($(this).val() === 'OR') {
            $("#abilityStoreOptionsSection").removeClass('is-hidden');
        } else {
            $("#abilityStoreOptionsSection").addClass('is-hidden');
        }
    });


    let classAbilityCount = 0;
    $("#addClassFeatureButton").click(function(){
        classAbilityCount++;

        let classAbilityID = "classAbility"+classAbilityCount;

        let newClassAbility = $("#classFeatureLayout").clone();
        newClassAbility.attr('id', classAbilityID);
        newClassAbility.removeClass('is-hidden');
        newClassAbility.appendTo("#classFeatureContent");

        let cardHeader = $("#"+classAbilityID).find(".card-header");
        let cardContent = $("#"+classAbilityID).find(".card-content");

        cardHeader.click(function(){
            if(cardContent.is(":visible")) {
                cardContent.addClass('is-hidden');
            } else {
                cardContent.removeClass('is-hidden');
            }
        });

        let cardHeaderIcon = $("#"+classAbilityID).find(".card-header-icon");
        cardHeaderIcon.click(function(){
            $("#"+classAbilityID).remove();
        });

        let inputClassFeatureName = $("#"+classAbilityID).find(".inputClassFeatureName:first");
        inputClassFeatureName.change(function(){
            let cFeatureLevel = $("#"+classAbilityID).find(".inputClassFeatureLevel:first").val();
            $("#"+classAbilityID).find(".card-header-title:first").html('Ability - '+inputClassFeatureName.val()+' (Level '+cFeatureLevel+')');
        });

        let inputClassFeatureLevel = $("#"+classAbilityID).find(".inputClassFeatureLevel:first");
        inputClassFeatureLevel.change(function(){
            let cFeatureName = $("#"+classAbilityID).find(".inputClassFeatureName:first").val();
            $("#"+classAbilityID).find(".card-header-title:first").html('Ability - '+cFeatureName+' (Level '+inputClassFeatureLevel.val()+')');
        });

        // When 'Is Selector' checkbox is changed
        let inputClassFeatureIsSelector = $("#"+classAbilityID).find(".inputClassFeatureIsSelector");
        inputClassFeatureIsSelector.change(function(){
            
            if ($(this).is(":checked")) {

                let classFeatureSelectionOptions = $("#"+classAbilityID).find(".classFeatureSelectionOptions");
                classFeatureSelectionOptions.removeClass('is-hidden');

                let classFeatureOptionsContent = $("#"+classAbilityID).find(".classFeatureOptionsContent");
                let classFeatureAddOptionButton = $("#"+classAbilityID).find(".classFeatureAddOptionButton");
                let classAbilityOptionsCount = 0;
                classFeatureAddOptionButton.click(function(){
                    classAbilityOptionsCount++;

                    let classAbilityOptionID = classAbilityID+"Option"+classAbilityOptionsCount;

                    let newClassAbilityOption = $("#classFeatureLayout").clone();
                    newClassAbilityOption.attr('id', classAbilityOptionID);
                    newClassAbilityOption.removeClass('is-hidden');
                    newClassAbilityOption.removeClass('classFeature');
                    newClassAbilityOption.addClass('classFeatureOption');
                    newClassAbilityOption.find(".classFeatureLevelSection").remove();
                    newClassAbilityOption.find(".classFeatureIsSelectorSection").remove();
                    newClassAbilityOption.find(".classFeatureSelectionOptions").remove();
                    newClassAbilityOption.find(".card-header-title").html('Option');
                    newClassAbilityOption.appendTo(classFeatureOptionsContent);

                    let cardHeader = $("#"+classAbilityOptionID).find(".card-header");
                    let cardContent = $("#"+classAbilityOptionID).find(".card-content");

                    cardHeader.click(function(){
                        if(cardContent.is(":visible")) {
                            cardContent.addClass('is-hidden');
                        } else {
                            cardContent.removeClass('is-hidden');
                        }
                    });

                    let cardHeaderIcon = $("#"+classAbilityOptionID).find(".card-header-icon");
                    cardHeaderIcon.click(function(){
                        $("#"+classAbilityOptionID).remove();
                    });

                });

            } else {

                let classFeatureSelectionOptions = $("#"+classAbilityID).find(".classFeatureSelectionOptions");
                classFeatureSelectionOptions.addClass('is-hidden');

            }

        });

    });


    let featCount = 0;
    $("#addFeatButton").click(function(){
        featCount++;

        let featID = "feat"+featCount;

        let newFeat = $("#featLayout").clone();
        newFeat.attr('id', featID);
        newFeat.removeClass('is-hidden');
        newFeat.appendTo("#featContent");

        let cardHeader = $("#"+featID).find(".card-header");
        let cardContent = $("#"+featID).find(".card-content");

        cardHeader.click(function(){
            if(cardContent.is(":visible")) {
                cardContent.addClass('is-hidden');
            } else {
                cardContent.removeClass('is-hidden');
            }
        });

        let cardHeaderIcon = $("#"+featID).find(".card-header-icon");
        cardHeaderIcon.click(function(){
            $("#"+featID).remove();
        });

        let inputFeatName = $("#"+featID).find(".inputFeatName");
        inputFeatName.change(function(){
            $("#"+featID).find(".card-header-title").html('Class Feat - '+inputFeatName.val());
        });

        let inputFeatTags = $("#"+featID).find(".inputFeatTags");
        inputFeatTags.change(function(){
            let tagNames = '- ';
            $(this).find(":selected").each(function(){
                tagNames += $(this).text()+' ';
            });
            $("#"+featID).find(".selectedTraits").html(tagNames);
        });

    });


    $("#createButton").click(function(){
        $(this).unbind();
        finishClass(false);
    });

});

function finishClass(isUpdate){

    let className = $("#inputName").val();
    let classVersion = $("#inputVersion").val();
    let classHitPoints = $("#inputHitPoints").val();

    let classKeyAbility = $("#inputKeyAbility").val();
    if(classKeyAbility === 'OR'){
        classKeyAbility = $("#inputKeyAbilityOptionOne").val()+' or '+$("#inputKeyAbilityOptionTwo").val();
    }

    let classPerception = $("#inputPerception").val();
    let classSkills = $("#inputSkills").val();
    let classSkillsMore = $("#inputSkillsMore").val();
    let classFortitude = $("#inputFortitude").val();
    let classReflex = $("#inputReflex").val();
    let classWill = $("#inputWill").val();

    let classWeaponsTrainedArray = $("#inputWeaponsTrained").val();
    let classWeaponsExpertArray = $("#inputWeaponsExpert").val();
    let classWeapons = '';
    for(let classWeaponsTrained of classWeaponsTrainedArray) {
        classWeapons += 'T:::'+classWeaponsTrained+',,, ';
    }
    for(let classWeaponsExpert of classWeaponsExpertArray) {
        classWeapons += 'E:::'+classWeaponsExpert+',,, ';
    }
    classWeapons = classWeapons.slice(0, -4); // Trim off that last ',,, '

    let classArmorTrainedArray = $("#inputArmorTrained").val();
    let classArmor = '';
    for(let classArmorTrained of classArmorTrainedArray) {
        classArmor += 'T:::'+classArmorTrained+',,, ';
    }
    classArmor = classArmor.slice(0, -4); // Trim off that last ',,, '

    let classDescription = $("#inputDescription").val();


    let classAbilitiesArray = [];
    $(".classFeature").each(function(){
        if($(this).is(":visible")) {
            let classFeatureName = $(this).find(".inputClassFeatureName").val();
            let classFeatureLevel = $(this).find(".inputClassFeatureLevel").val();
            let classFeatureDesc = $(this).find(".inputClassFeatureDesc").val();
            let classFeatureCode = $(this).find(".inputClassFeatureCode").val();
            
            let classFeatureOptions = [];
            if($(this).find(".classFeatureSelectionOptions").is(":visible")){
                $(this).find(".classFeatureOption").each(function(){
                    classFeatureOptions.push({
                        name: $(this).find(".inputClassFeatureName").val(),
                        description: $(this).find(".inputClassFeatureDesc").val(),
                        code: $(this).find(".inputClassFeatureCode").val(),
                    });
                });
            }

            classAbilitiesArray.push({
                name: classFeatureName,
                level: classFeatureLevel,
                description: classFeatureDesc,
                code: classFeatureCode,
                options: classFeatureOptions,
            });
        }
    });

    let classFeatsArray = [];
    $(".classFeat").each(function(){
        if($(this).is(":visible")) {
            let featName = $(this).find(".inputFeatName").val();
            let featLevel = $(this).find(".inputFeatLevel").val();
            let featActions = $(this).find(".inputFeatActions").val();
            let featRarity = $(this).find(".inputFeatRarity").val();
            let featTagsArray = $(this).find(".inputFeatTags").val();
            let featPrereq = $(this).find(".inputFeatPrereq").val();
            let featReq = $(this).find(".inputFeatReq").val();
            let featFreq = $(this).find(".inputFeatFreq").val();
            let featTrigger = $(this).find(".inputFeatTrigger").val();
            let featDesc = $(this).find(".inputFeatDesc").val();
            let featSpecial = $(this).find(".inputFeatSpecial").val();
            let featSelectMultiple = ($(this).find(".inputFeatSelectMultiple:checked").val() == '1') ? 1 : 0;
            let featCode = $(this).find(".inputFeatCode").val();
            classFeatsArray.push({
                name: featName,
                actions: featActions,
                level: featLevel,
                rarity: featRarity,
                prerequisites: featPrereq,
                frequency: featFreq,
                trigger: featTrigger,
                requirements: featReq,
                description: featDesc,
                special: featSpecial,
                canSelectMultiple: featSelectMultiple,
                code: featCode,
                featTagsArray
            });
        }
    });
    
    let requestPacket = null;
    let classID = null;
    if(isUpdate){
        requestPacket = "requestAdminUpdateClass";
        classID = getClassEditorIDFromURL();
    } else {
        requestPacket = "requestAdminAddClass";
    }

    socket.emit(requestPacket,{
        classID,
        className,
        classVersion,
        classHitPoints,
        classKeyAbility,
        classPerception,
        classSkills,
        classSkillsMore,
        classFortitude,
        classReflex,
        classWill,
        classWeapons,
        classArmor,
        classDescription,
        classAbilitiesArray,
        classFeatsArray
    });

}

socket.on("returnAdminCompleteClass", function() {
    window.location.href = '/admin/manage/class';
});