const CharContentSources = require('./../CharContentSources');
const CharContentHomebrew = require('./../CharContentHomebrew');

const CharGathering = require('./../CharGathering');

const CharChoicesLoad = require('./Load_CharChoices');

const { Prisma } = require('./../PrismaConnection');

function mapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

module.exports = async function(socket, charID, character=null, featObject=null, itemMap=null, spellMap=null, skillObject=null, tags=null, abilObject=null, allConditions=null, allLanguages=null, unselectedDataArray=null) {

  console.log('~ STARTING BUILDER-CORE LOAD ~');

  socket.emit('updateLoadProgess', { message: 'Finding Character', upVal: 3 }); // (3/100) //
  if(character==null){
    character = await CharGathering.getCharacter(charID);
  }

  socket.emit('updateLoadProgess', { message: 'Indexing Traits', upVal: 5 }); // (8/100) //
  if(tags==null){
    tags = await CharGathering.getAllTags(charID, character);
  }

  socket.emit('updateLoadProgess', { message: 'Understanding Feats', upVal: 25 }); // (33/100) //
  if(featObject==null){
    featObject = await CharGathering.getAllFeats(charID, character, feats=null, tags);
  }

  socket.emit('updateLoadProgess', { message: 'Bartering for Items', upVal: 20 }); // (53/100) //
  if(itemMap==null){
    itemMap = await CharGathering.getAllItems(charID, character, items=null, tags);
  }

  socket.emit('updateLoadProgess', { message: 'Discovering Spells', upVal: 15 }); // (68/100) //
  if(spellMap==null){
    spellMap = await CharGathering.getAllSpells(charID, character, spells=null, taggedSpells=null, tags);
  }

  socket.emit('updateLoadProgess', { message: 'Determining Skills', upVal: 6 }); // (74/100) //
  if(skillObject==null){
    skillObject = await CharGathering.getAllSkills(charID, skills=null, profDataArray=null, loreDataArray=null);
  }

  socket.emit('updateLoadProgess', { message: 'Analyzing Ability Scores', upVal: 3 }); // (77/100) //
  if(abilObject==null){
    abilObject = await CharGathering.getAbilityScores(charID, charAbilityScores=null, bonusDataArray=null);
  }

  socket.emit('updateLoadProgess', { message: 'Finding Conditions', upVal: 3 }); // (80/100) //
  if(allConditions==null){
    allConditions = await CharGathering.getAllConditions();
  }

  socket.emit('updateLoadProgess', { message: 'Finding Languages', upVal: 2 }); // (82/100) //
  if(allLanguages==null){
    allLanguages = await CharGathering.getAllLanguagesBasic(charID, character);
  }

  socket.emit('updateLoadProgess', { message: 'Finding Unselected Options', upVal: 1 }); // (83/100) //
  if(unselectedDataArray==null){
    unselectedDataArray = await CharGathering.getAllUnselectedData(charID);
  }

  socket.emit('updateLoadProgess', { message: 'Considering Character Choices', upVal: 17 }); // (100/100) //
  const choiceStruct = await CharChoicesLoad(charID, character, background=null, ancestry=null, heritage=null, ancestries=null, charTagsArray=null, classDetails=null, featDataArray=null, bonusDataArray=null, choiceDataArray=null, profDataArray=null, innateSpellDataArray=null, langDataArray=null, senseDataArray=null, phyFeatDataArray=null, loreDataArray=null, focusPointDataArray=null, profMap=null, domains=null, domainDataArray=null, advancedDomainDataArray=null, extraClassFeatures=null, heritageEffectsArray=null);


  socket.emit('updateLoadProgess', { message: 'Finalizing', upVal: 10 }); // (110/100) //
  let builderCoreStruct = {
    FeatObject: featObject,
    SkillObject: skillObject,
    ItemObject: mapToObj(itemMap),
    SpellObject: mapToObj(spellMap),
    AbilObject: abilObject,
    AllTags: tags,
    AllConditions: allConditions,
    AllLanguages: allLanguages,
    UnselectedDataArray: unselectedDataArray,
  };

  let bStruct = {
    builderCore: builderCoreStruct,
    choiceStruct: choiceStruct,
  };

  console.log('~ COMPLETE BUILDER-CORE LOAD! ~');

  return bStruct;

};