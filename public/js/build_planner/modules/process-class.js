/* Copyright (C) 2021, Wanderer's Guide, all rights reserved.
    By Aaron Cassar.
*/

function processClass() {

  const charClass = getCharClass();
  if(charClass != null){

    // Process initial class stats //
    $(`#initial-stats-class`).append(`
    
      <div class="pt-1">
        <div class="pos-relative">
          <div class="">
            <p class="text-center"><span class="is-size-4 has-text-weight-semibold">Class</span></p>
          </div>
        </div>

        <div class="columns is-tablet">
          <div class="column text-center">
            <p class="title-font is-bold">Key Ability</p>
            <p id="class-feature-initial-stats-display-key-ability"></p>
          </div>
          <div class="column text-center">
            <p class="title-font is-bold">Hit Points</p>
            <p id="class-feature-initial-stats-display-hit-points"></p>
          </div>
        </div>
        <div class="columns is-tablet">
          <div class="column text-center">
            <p class="title-font is-bold">Perception</p>
            <p id="class-feature-initial-stats-display-perception"></p>
          </div>
          <div class="column text-center">
            <p class="title-font is-bold">Skills</p>
            <p id="class-feature-initial-stats-display-skills"></p>
          </div>
        </div>
        <div class="columns is-tablet">
          <div class="column text-center">
            <p class="title-font is-bold">Saving Throws</p>
            <p id="class-feature-initial-stats-display-saving-throws"></p>
          </div>
          <div class="column text-center">
            <p class="title-font is-bold">Class DC</p>
            <p id="class-feature-initial-stats-display-class-dc"></p>
          </div>
        </div>
        <div class="columns is-tablet">
          <div class="column text-center">
            <p class="title-font is-bold">Attacks</p>
            <p id="class-feature-initial-stats-display-attacks"></p>
          </div>
          <div class="column text-center">
            <p class="title-font is-bold">Defenses</p>
            <p id="class-feature-initial-stats-display-defenses"></p>
          </div>
        </div>

        <hr class="mt-1 mb-0 mx-5">
        <div class="mx-5 my-1">
          <div id="class-feature-initial-stats-code-key-ability"></div>
          <div id="class-feature-initial-stats-code-hit-points"></div>
          <div id="class-feature-initial-stats-code-perception"></div>
          <div id="class-feature-initial-stats-code-skills"></div>
          <div id="class-feature-initial-stats-code-saving-throws"></div>
          <div id="class-feature-initial-stats-code-class-dc"></div>
          <div id="class-feature-initial-stats-code-attacks"></div>
          <div id="class-feature-initial-stats-code-defenses"></div>
        </div>
        <hr class="mt-0 mb-1 mx-0" style="height: 1px;">
      </div>
    
    `);
    processClassStats(charClass.Class, {

      keyAbility: {
        displayID: 'class-feature-initial-stats-display-key-ability',
        codeID: 'class-feature-initial-stats-code-key-ability',
      },
      hitPoints: {
        displayID: 'class-feature-initial-stats-display-hit-points',
        codeID: 'class-feature-initial-stats-code-hit-points',
      },
  
      perception: {
        displayID: 'class-feature-initial-stats-display-perception',
        codeID: 'class-feature-initial-stats-code-perception',
      },
      skills: {
        displayID: 'class-feature-initial-stats-display-skills',
        codeID: 'class-feature-initial-stats-code-skills',
      },
      savingThrows: {
        displayID: 'class-feature-initial-stats-display-saving-throws',
        codeID: 'class-feature-initial-stats-code-saving-throws',
      },
      classDC: {
        displayID: 'class-feature-initial-stats-display-class-dc',
        codeID: 'class-feature-initial-stats-code-class-dc',
      },
      attacks: {
        displayID: 'class-feature-initial-stats-display-attacks',
        codeID: 'class-feature-initial-stats-code-attacks',
      },
      defenses: {
        displayID: 'class-feature-initial-stats-display-defenses',
        codeID: 'class-feature-initial-stats-code-defenses',
      },
  
    }, PROCESS_CLASS_STATS_TYPE.BOTH);

    // Process each class feature //
    for(const classFeature of charClass.Abilities){
      if(classFeature.selectType != 'SELECT_OPTION' && classFeature.level <= g_char_level){
        $(`#level-${classFeature.level}-body`).append(`

          <div class="class-feature-section pt-1">
            <div class="pos-relative">
              <div class="fading-reveal-container is-active">
                <p class="class-feature-header text-center"><span class="is-size-4 has-text-weight-semibold">${classFeature.name}</span></p>
                <div id="class-feature-container-${classFeature.id}" class="class-feature-container ability-text-section px-1">
                </div>
              </div>
              <p class="reveal-container-text is-hidden has-text-info">Show More</p>
            </div>

            <div id="class-feature-selector-section-${classFeature.id}"></div>

            <hr id="class-feature-code-hr-${classFeature.id}" class="mt-1 mb-0 mx-5">
            <div id="class-feature-code-${classFeature.id}" class="mx-5"></div>
            <hr class="mt-0 mb-1 mx-0" style="height: 1px;">
          </div>

        `);

        $(`#class-feature-container-${classFeature.id}`).append(processText(classFeature.description, false, null));

        // Selection Options
        if(classFeature.selectType === 'SELECTOR') {
          
          let selectionOptionListHTML = `
            <option value="chooseDefault">Choose a ${classFeature.name}</option>
            <optgroup label="──────────"></optgroup>
          `;
          const featureChoice = getDataAllClassChoice().find(featureChoice => {
            return featureChoice.SelectorID == classFeature.id;
          });
          for(const classFeatureOption of charClass.Abilities) {
            if(classFeatureOption.selectType === 'SELECT_OPTION' && (classFeatureOption.selectOptionFor === classFeature.id || classFeatureOption.indivClassAbilName === classFeature.name)) {

              if(featureChoice != null && featureChoice.OptionID == classFeatureOption.id) {
                selectionOptionListHTML += '<option value="'+classFeatureOption.id+'" selected>'+classFeatureOption.name+'</option>';
              } else {
                selectionOptionListHTML += '<option value="'+classFeatureOption.id+'">'+classFeatureOption.name+'</option>';
              }

            }
          }

          $(`#class-feature-selector-section-${classFeature.id}`).html(`

            <div class="field is-grouped is-grouped-centered">
              <div class="select">
                <select id="class-feature-selector-${classFeature.id}" class="classAbilSelection">
                  ${selectionOptionListHTML}
                </select>
              </div>
            </div>
            <div id="class-feature-selector-result-${classFeature.id}" class="columns is-centered m-0 is-hidden">
              <div class="column is-mobile is-8 p-0 mb-2">
                <article class="message is-info">
                  <div class="message-body">
                    <div id="class-feature-selector-description-${classFeature.id}"></div>
                    <div id="class-feature-selector-code-${classFeature.id}"></div>
                  </div>
                </article>
              </div>
            </div>

          `);

          // Class Feature Selector
          $(`#class-feature-selector-${classFeature.id}`).change(function(){

            $(`#class-feature-selector-description-${classFeature.id}`).html('');
            $(`#class-feature-selector-code-${classFeature.id}`).html('');

            let srcStruct = {
              sourceType: 'class',
              sourceLevel: classFeature.level,
              sourceCode: 'classAbilitySelector-'+classFeature.id,
              sourceCodeSNum: 'a',
            };

            if($(this).val() == 'chooseDefault'){
              $(this).parent().addClass("is-info");
              $(`#class-feature-selector-result-${classFeature.id}`).addClass('is-hidden');

              // Save choice
              socket.emit("requestClassChoiceChange",
                  getCharIDFromURL(),
                  srcStruct,
                  null);

              // Clear all data under srcStruct
              socket.emit("requestDataClearAtSrcStruct",
                  getCharIDFromURL(),
                  srcStruct);
              deleteDataBySourceStruct(srcStruct);
              
            } else {
              $(this).parent().removeClass("is-info");
              $(`#class-feature-selector-result-${classFeature.id}`).removeClass('is-hidden');

              const chosenClassFeature = charClass.Abilities.find(cf => {
                return cf.id == $(this).val();
              });

              $(`#class-feature-selector-description-${classFeature.id}`).html(processText(chosenClassFeature.description, false, null));

              // Save choice
              socket.emit("requestClassChoiceChange",
                  getCharIDFromURL(),
                  srcStruct,
                  { SelectorID : classFeature.id, OptionID : chosenClassFeature.id });

              // Run class feature option code
              processCode(
                chosenClassFeature.code,
                srcStruct,
                `class-feature-selector-code-${classFeature.id}`,
                {source: 'Class Feature Option', sourceName: classFeature.name+' - '+chosenClassFeature.name});

            }

            $(this).blur();
          });
          $(`#class-feature-selector-${classFeature.id}`).trigger('change');

        }

        // Run code
        processCode(
          classFeature.code,
          {
            sourceType: 'class',
            sourceLevel: classFeature.level,
            sourceCode: 'classAbility-'+classFeature.id,
            sourceCodeSNum: 'a'
          },
          `class-feature-code-${classFeature.id}`,
          {source: 'Class Feature', sourceName: classFeature.name+' (Lvl '+classFeature.level+')'});

        // Hide top hr if no code result is generated
        if($(`#class-feature-code-${classFeature.id}`).html() == '' || $(`#class-feature-code-${classFeature.id}`).find('div').html() == ''){
          $(`#class-feature-code-hr-${classFeature.id}`).addClass('is-hidden');
        }

      }
    }

  }

}