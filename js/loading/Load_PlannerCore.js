
const GeneralGathering = require('../GeneralGathering');
const CharGathering = require('../CharGathering');

const Inventory = require('./../../models/contentDB/Inventory');
const InvItem = require('./../../models/contentDB/InvItem');
const CharCondition = require('./../../models/contentDB/CharCondition');
const NoteField = require('./../../models/contentDB/NoteField');
const SpellBookSpell = require('./../../models/contentDB/SpellBookSpell');
const PhysicalFeature = require('./../../models/contentDB/PhysicalFeature');


const { Prisma } = require('../PrismaConnection');

function mapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

module.exports = async function(userID) {

  console.log('~ STARTING PLANNER-CORE LOAD ~');

  // socket.emit('updateLoadProgess', { message: 'Gathering Skills', upVal: 5 }); // (5/100) //
  const skillObject = await GeneralGathering.getAllSkills(userID);

  // socket.emit('updateLoadProgess', { message: 'Understanding Feats', upVal: 20 }); // (25/100) //
  const featsObject = await GeneralGathering.getAllFeats(userID);

  // socket.emit('updateLoadProgess', { message: 'Bartering for Items', upVal: 10 }); // (35/100) //
  const itemMap = await GeneralGathering.getAllItems(userID);

  // socket.emit('updateLoadProgess', { message: 'Discovering Spells', upVal: 10 }); // (45/100) //
  const spellMap = await GeneralGathering.getAllSpells(userID);

  // socket.emit('updateLoadProgess', { message: 'Finding Languages', upVal: 5 }); // (50/100) //
  const allLanguages = await GeneralGathering.getAllLanguages(userID);

  // socket.emit('updateLoadProgess', { message: 'Finding Conditions', upVal: 5 }); // (55/100) //
  const allConditions = await GeneralGathering.getAllConditions(userID);

  // socket.emit('updateLoadProgess', { message: 'Indexing Traits', upVal: 5 }); // (60/100) //
  const allTags = await GeneralGathering.getAllTags(userID);

  // socket.emit('updateLoadProgess', { message: 'Loading Classes', upVal: 10 }); // (70/100) //
  const classes = await GeneralGathering.getAllClasses(userID);

  // socket.emit('updateLoadProgess', { message: 'Loading Ancestries', upVal: 10 }); // (80/100) //
  const ancestries = await GeneralGathering.getAllAncestries(userID);

  // socket.emit('updateLoadProgess', { message: 'Loading Backgrounds', upVal: 5 }); // (85/100) //
  const backgrounds = await GeneralGathering.getAllBackgrounds(userID);

  // socket.emit('updateLoadProgess', { message: 'Loading Archetypes', upVal: 5 }); // (90/100) //
  const archetypes = await GeneralGathering.getAllArchetypes(userID);

  // socket.emit('updateLoadProgess', { message: 'Loading Heritages', upVal: 5 }); // (95/100) //
  const uniHeritages = await GeneralGathering.getAllUniHeritages(userID);

  // socket.emit('updateLoadProgess', { message: 'Loading Physical Features', upVal: 0 }); // (95/100) //
  const allPhyFeats = await Prisma.physicalFeatures.findMany();

  // socket.emit('updateLoadProgess', { message: 'Loading Senses', upVal: 0 }); // (95/100) //
  const allSenses = await Prisma.senseTypes.findMany();

  //// socket.emit('updateLoadProgess', { message: 'Discovering Domains', upVal: 0 }); // (95/100) //
  //const allDomains = await CharGathering.getAllDomains(userID, character.enabledSources, character.enabledHomebrew);
  
  //// socket.emit('updateLoadProgess', { message: 'Finding Class Archetypes', upVal: 3 }); // (86/100) //
  //const classArchetypes = await CharGathering.getAllClassArchetypes(userID, character.enabledSources, character.enabledHomebrew);

  // socket.emit('updateLoadProgess', { message: 'Finalizing', upVal: 10 }); // (105/100) //
  const plannerStruct = {
    featsObject,
    skillObject,
    itemObject: mapToObj(itemMap),
    spellObject: mapToObj(spellMap),
    allLanguages,
    allConditions,
    allTags,
    classes,
    ancestries,
    archetypes,
    backgrounds,
    uniHeritages,
    //classArchetypes,
    allPhyFeats,
    allSenses,
  };

  console.log('Starting char data...');
  let charID = 60423;
  return CharGathering.getCharacter(userID, charID)
    .then((character) => {
      return Inventory.findOne({ where: { id: character.inventoryID} })
      .then((inventory) => {
        return InvItem.findAll({ where: { invID: inventory.id} })
        .then((invItems) => {
          return CharGathering.getAllMetadata(userID, charID)
          .then((charMetaData) => {
            return CharGathering.getCharAnimalCompanions(userID, charID)
            .then((charAnimalCompanions) => {
              return CharGathering.getCharFamiliars(userID, charID)
              .then((charFamiliars) => {
                return CharCondition.findAll({ where: { charID: charID} })
                .then((charConditions) => {
                  return NoteField.findAll({ where: { charID: charID } })
                  .then(function(noteFields) {
                    return SpellBookSpell.findAll({ where: { charID: charID } })
                    .then(function(spellBookSpells) {

                      const choiceStruct = {
                        character,
                        inventory,
                        invItems,
                        charMetaData,
                        charAnimalCompanions,
                        charFamiliars,
                        charConditions,
                        noteFields,
                        spellBookSpells,
                      };
                    
                      console.log('~ COMPLETE PLANNER-CORE LOAD! ~');
                    
                      return {plannerStruct, choiceStruct};

                    });
                  });
                });
              });
            });
          });
        });
      });
    });

};