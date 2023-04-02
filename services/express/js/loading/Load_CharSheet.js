const CharGathering = require("./../CharGathering");
const CampaignGathering = require("./../CampaignGathering");

const CharChoicesLoad = require("./Load_CharChoices");

const { Prisma } = require("./../PrismaConnection");

function mapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

module.exports = async function (userID, charID, character) {
  console.log("~ STARTING SHEET LOAD ~");

  //socket.emit('updateLoadProgess', { message: 'Finding Character', upVal: 3 }); // (3/100) //
  if (character == null) {
    character = await CharGathering.getCharacter(userID, charID);
  }

  //socket.emit('updateLoadProgess', { message: 'Opening Books', upVal: 1 }); // (4/100) //
  const sourcesArray = CharGathering.getSourceBooks(
    userID,
    character.enabledSources,
    character.enabledHomebrew,
  );

  //
  const campaignDetails = CampaignGathering.getCampaignDetailsFromChar(charID);

  //socket.emit('updateLoadProgess', { message: 'Discovering Backstory', upVal: 2 }); // (6/100) //
  const background = await CharGathering.getBackground(
    userID,
    charID,
    character,
  );

  //socket.emit('updateLoadProgess', { message: 'Examining Ancestry', upVal: 3 }); // (9/100) //
  const ancestry = await CharGathering.getAncestry(userID, charID, character);

  //socket.emit('updateLoadProgess', { message: 'Examining Heritage', upVal: 3 }); // (12/100) //
  const heritage = await CharGathering.getHeritage(userID, charID, character);

  //socket.emit('updateLoadProgess', { message: 'Finding Conditions', upVal: 3 }); // (15/100) //
  const allConditions = CharGathering.getAllConditions(userID);

  //socket.emit('updateLoadProgess', { message: 'Finding Languages', upVal: 3 }); // (18/100) //
  const allLanguages = CharGathering.getAllLanguagesBasic(
    userID,
    character.enabledHomebrew,
  );

  //socket.emit('updateLoadProgess', { message: 'Keeping Inventory', upVal: 8 }); // (26/100) //
  const invStruct = CharGathering.getInventory(userID, character.inventoryID);

  //socket.emit('updateLoadProgess', { message: 'Indexing Traits', upVal: 5 }); // (31/100) //
  const tags = await CharGathering.getAllTags(
    userID,
    character.enabledHomebrew,
  );

  //socket.emit('updateLoadProgess', { message: 'Discovering Spells', upVal: 5 }); // (36/100) //
  const spellMap = CharGathering.getAllSpells(
    userID,
    character.enabledSources,
    character.enabledHomebrew,
    (spells = null),
    (taggedSpells = null),
    tags,
  );

  //socket.emit('updateLoadProgess', { message: 'Bartering for Items', upVal: 15 }); // (51/100) //
  const itemMap = CharGathering.getAllItems(
    userID,
    character.enabledSources,
    character.enabledHomebrew,
    (items = null),
    tags,
  );

  //socket.emit('updateLoadProgess', { message: 'Understanding Feats', upVal: 15 }); // (66/100) //
  const featObject = CharGathering.getAllFeats(
    userID,
    character.enabledSources,
    character.enabledHomebrew,
    (feats = null),
    tags,
  );

  //socket.emit('updateLoadProgess', { message: 'Analyzing Ability Scores', upVal: 3 }); // (69/100) //
  const abilObject = CharGathering.getAbilityScores(
    userID,
    charID,
    (charAbilityScores = null),
    (bonusDataArray = null),
  );

  //socket.emit('updateLoadProgess', { message: 'Determining Skills', upVal: 6 }); // (75/100) //
  const skillObject = CharGathering.getAllSkills(
    userID,
    charID,
    (skills = null),
    (profDataArray = null),
    (loreDataArray = null),
  );

  //socket.emit('updateLoadProgess', { message: 'Preparing Spellbook', upVal: 5 }); // (80/100) //
  const spellDataStruct = CharGathering.getSpellData(userID, charID);

  //socket.emit('updateLoadProgess', { message: 'Considering Character Choices', upVal: 5 }); // (85/100) //
  const choiceStruct = CharChoicesLoad(
    userID,
    charID,
    character,
    background,
    ancestry,
    heritage,
    (ancestries = null),
    (charTagsArray = null),
    (classDetails = null),
    (featDataArray = null),
    (bonusDataArray = null),
    (choiceDataArray = null),
    (profDataArray = null),
    (innateSpellDataArray = null),
    (langDataArray = null),
    (senseDataArray = null),
    (phyFeatDataArray = null),
    (loreDataArray = null),
    (focusPointDataArray = null),
    (profMap = null),
    (domains = null),
    (domainDataArray = null),
    (advancedDomainDataArray = null),
    (extraClassFeatures = null),
    (heritageEffectsArray = null),
  );

  //socket.emit('updateLoadProgess', { message: 'Gathering Character Conditions', upVal: 2 }); // (87/100) //
  const conditionsObject = CharGathering.getAllCharConditions(
    userID,
    charID,
    (charConditions = null),
  );

  //socket.emit('updateLoadProgess', { message: 'Training Companions', upVal: 2 }); // (89/100) //
  const companionData = CharGathering.getCompanionData(
    userID,
    charID,
    character.enabledSources,
    character.enabledHomebrew,
  );

  //socket.emit('updateLoadProgess', { message: 'Gathering Resistances and Weaknesses', upVal: 2 }); // (91/100) //
  const resistAndVulnerStruct = CharGathering.getResistancesAndVulnerabilities(
    userID,
    charID,
    (resistancesDataArray = null),
    (vulnerabilitiesDataArray = null),
  );

  //socket.emit('updateLoadProgess', { message: 'Gathering Specializations', upVal: 1 }); // (93/100) //
  const specializeStruct = CharGathering.getSpecializations(
    userID,
    charID,
    (weapSpecialsDataArray = null),
    (weapCriticalsDataArray = null),
    (armorSpecialDataArray = null),
  );

  //socket.emit('updateLoadProgess', { message: 'Finding Unselected Options', upVal: 1 }); // (94/100) //
  const unselectedDataArray = CharGathering.getAllUnselectedData(
    userID,
    charID,
  );

  //socket.emit('updateLoadProgess', { message: 'Searching for Notebook', upVal: 2 }); // (95/100) //
  const notesDataArray = CharGathering.getNoteFields(userID, charID);

  //socket.emit('updateLoadProgess', { message: 'Gathering Speeds', upVal: 1 }); // (96/100) //
  const speedsDataArray = CharGathering.getOtherSpeeds(userID, charID);

  //socket.emit('updateLoadProgess', { message: 'Gathering Sheet States', upVal: 1 }); // (97/100) //
  const sheetStatesArray = CharGathering.getSheetStates(
    userID,
    character.enabledSources,
    character.enabledHomebrew,
  );

  //socket.emit('updateLoadProgess', { message: 'Gathering Weapon Familiarities', upVal: 2 }); // (99/100) //
  const familiaritiesDataArray = CharGathering.getWeaponFamiliarities(
    userID,
    charID,
  );

  //socket.emit('updateLoadProgess', { message: 'Locating Class Features', upVal: 1 }); // (100/100) //
  const allClassFeatureOptions = CharGathering.getAllClassFeatureOptions(
    userID,
    character.enabledSources,
    character.enabledHomebrew,
  );

  // //socket.emit('updateLoadProgess', { message: 'Finding Class Archetypes', upVal: 3 }); // (86/100) //
  const classArchetypeArray = CharGathering.getAllClassArchetypes(
    userID,
    character.enabledSources,
    character.enabledHomebrew,
  );

  let promise = await Promise.all([
    abilObject,
    skillObject,
    featObject,
    spellMap,
    choiceStruct,
    spellDataStruct,
    invStruct,
    itemMap,
    conditionsObject,
    allConditions,
    allLanguages,
    sourcesArray,
    resistAndVulnerStruct,
    specializeStruct,
    familiaritiesDataArray,
    notesDataArray,
    speedsDataArray,
    companionData,
    allClassFeatureOptions,
    sheetStatesArray,
    classArchetypeArray,
    unselectedDataArray,
    campaignDetails,
  ]);

  //socket.emit('updateLoadProgess', { message: 'Finalizing', upVal: 10 }); // (110/100) //
  let charInfo = {
    Character: character,
    Background: background,
    Ancestry: ancestry,
    Heritage: heritage,
    AbilObject: promise[0],
    SkillObject: promise[1],
    FeatObject: promise[2],
    SpellObject: mapToObj(promise[3]),
    ChoiceStruct: promise[4],
    SpellDataStruct: promise[5],
    InvStruct: promise[6],
    ItemObject: mapToObj(promise[7]),
    ConditionsObject: promise[8],
    AllConditions: promise[9],
    AllLanguages: promise[10],
    EnabledSources: promise[11],
    ResistAndVulners: promise[12],
    SpecializeStruct: promise[13],
    WeaponFamiliarities: promise[14],
    NotesFields: promise[15],
    OtherSpeeds: promise[16],
    AllTags: tags,
    CompanionData: promise[17],
    AllClassFeatureOptions: promise[18],
    SheetStatesArray: promise[19],
    ClassArchetypeArray: promise[20],
    UnselectedDataArray: promise[21],
    CampaignDetails: promise[22],
  };

  console.log("~ COMPLETE SHEET LOAD! ~");

  return charInfo;
};
