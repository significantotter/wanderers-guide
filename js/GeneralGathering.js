
const { Op } = require("sequelize");

const Condition = require('../models/contentDB/Condition');
const Class = require('../models/contentDB/Class');
const ClassAbility = require('../models/contentDB/ClassAbility');
const Archetype = require('../models/contentDB/Archetype');
const Feat = require('../models/contentDB/Feat');
const FeatTag = require('../models/contentDB/FeatTag');
const Tag = require('../models/contentDB/Tag');
const Spell = require('../models/contentDB/Spell');
const TaggedSpell = require('../models/contentDB/TaggedSpell');
const Skill = require('../models/contentDB/Skill');
const Background = require('../models/contentDB/Background');
const Language = require('../models/contentDB/Language');
const Ancestry = require('../models/contentDB/Ancestry');
const Heritage = require('../models/contentDB/Heritage');
const UniHeritage = require('../models/contentDB/UniHeritage');
const AncestryLanguage = require('../models/contentDB/AncestryLanguage');
const AncestryBoost = require('../models/contentDB/AncestryBoost');
const AncestryFlaw = require('../models/contentDB/AncestryFlaw');
const SenseType = require('../models/contentDB/SenseType');
const Item = require('../models/contentDB/Item');
const Weapon = require('../models/contentDB/Weapon');
const DamageType = require('../models/contentDB/DamageType');
const TaggedItem = require('../models/contentDB/TaggedItem');
const Armor = require('../models/contentDB/Armor');
const Storage = require('../models/contentDB/Storage');
const Shield = require('../models/contentDB/Shield');
const ItemRune = require('../models/contentDB/ItemRune');

const CharGathering = require('./CharGathering');

function mapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v;
    }
    return obj;
}

module.exports = class GeneralGathering {

    static getTag(tagID, homebrewID=null) {
      return Tag.findOne({ where: { id: tagID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((tag) => {
        return {
          trait : tag,
        };
      });
    }

    static getAllTags(homebrewID=null) {
      return Tag.findAll({
        where: { isArchived: 0, homebrewID: { [Op.or]: [null,homebrewID] } },
        order: [['name', 'ASC'],]
      }).then((allTags) => {
        return allTags;
      });
    }

    static getCondition(conditionID) {
      return Condition.findOne({ where: { id: conditionID } })
      .then((condition) => {
        return {
          condition : condition,
        };
      });
    }

    static getAllClasses(homebrewID=null) {
        return Class.findAll({
          where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        }).then((classes) => {
            return ClassAbility.findAll({
                order: [['level', 'ASC'],['name', 'ASC'],]
            })
            .then((allClassAbilities) => {
                
                let classMap = new Map();

                for (const cClass of classes) {
                    classMap.set(cClass.id, {Class : cClass, Abilities : []}); 
                }

                for (const classAbil of allClassAbilities) {
                    let classID = classAbil.classID;

                    if(classID == null && classAbil.indivClassName != null){
                        let cClass = classes.find(cClass => {
                            return cClass.name === classAbil.indivClassName;
                        });
                        if(cClass != null){
                            classID = cClass.id;
                        }
                    }

                    let classStruct = classMap.get(classID);
                    if(classStruct != null){
                        classStruct.Abilities.push(classAbil);
                    }

                }

                return mapToObj(classMap);

            });
        });
    }

    static getAllClassesBasic(homebrewID=null) {
      return Class.findAll({
        order: [['name', 'ASC'],],
        where: { homebrewID: { [Op.or]: [null,homebrewID] } }
      }).then((classes) => {
        return classes;
      });
    }

    static getClass(classID, homebrewID=null) {
      return Class.findOne({ where: { id: classID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((cClass) => {
        if(cClass == null) {return null;}
        return ClassAbility.findAll({
          order: [['level', 'ASC'],['name', 'ASC'],],
          where: {
            [Op.or]: [
                { classID: cClass.id },
                { indivClassName: cClass.name }
            ],
            homebrewID: { [Op.or]: [null,homebrewID] },
          },
        }).then((classAbilities) => {
          return {
            class : cClass,
            class_features : classAbilities,
          };
        });
      });
    }

    static getAllArchetypes(homebrewID=null) {
        return Archetype.findAll({
          order: [['name', 'ASC'],],
          where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        }).then((archetypes) => {
            return archetypes;
        });
    }

    static getArchetype(archetypeID, homebrewID=null) {
      return Archetype.findOne({ where: { id: archetypeID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((archetype) => {
        return {
          archetype : archetype,
        };
      });
    }

    static getAllUniHeritages(homebrewID=null) {
        return UniHeritage.findAll({
            order: [['name', 'ASC'],],
            where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        }).then((uniHeritages) => {
            return uniHeritages;
        });
    }

    static getUniHeritage(uniHeritageID, homebrewID=null) {
      return UniHeritage.findOne({ where: { id: uniHeritageID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((uniHeritage) => {
        return {
          heritage : uniHeritage,
        };
      });
    }

    static getAllHeritages(homebrewID=null) {
        return Heritage.findAll({
            order: [['name', 'ASC'],],
            where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        }).then((heritages) => {
            return heritages;
        });
    }

    static getHeritage(heritageID, homebrewID=null) {
      return Heritage.findOne({ where: { id: heritageID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((heritage) => {
        return {
          heritage : heritage,
        };
      });
    }

    static getAllAncestriesBasic(homebrewID=null) {
        return Ancestry.findAll({
            order: [['name', 'ASC'],],
            where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        }).then((ancestries) => {
            return ancestries;
        });
    }

    static getAncestryBasic(ancestryID, homebrewID=null) {
      return Ancestry.findOne({ where: { id: ancestryID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((ancestry) => {
        return {
          ancestry : ancestry,
        };
      });
    }

    static getAncestry(ancestryID, homebrewID=null) {
      return Ancestry.findOne({ where: { id: ancestryID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((ancestry) => {
          return Heritage.findAll({
              where: {
                [Op.or]: [
                    { ancestryID: ancestryID },
                    { indivAncestryName: ancestry.name }
                ],
                homebrewID: { [Op.or]: [null,homebrewID] },
              },
              order: [['name', 'ASC'],]
          }).then((heritages) => {
              return Language.findAll()
              .then((languages) => {
                  return AncestryLanguage.findAll({ where: { ancestryID: ancestryID } })
                  .then((ancestLangs) => {
                      return AncestryBoost.findAll({ where: { ancestryID: ancestryID } })
                      .then((ancestBoosts) => {
                          return AncestryFlaw.findAll({ where: { ancestryID: ancestryID } })
                          .then((ancestFlaws) => {
                            return SenseType.findAll()
                            .then((senseTypes) => {
                                return CharGathering.getAllPhysicalFeatures()
                                .then((physicalFeatures) => {

                                    let visionSense = null;
                                    let additionalSense = null;
                                    for(let senseType of senseTypes){
                                        if(senseType.id === ancestry.visionSenseID){
                                            visionSense = senseType;
                                        } else if(senseType.id === ancestry.additionalSenseID){
                                            additionalSense = senseType;
                                        }
                                    }

                                    let physicalFeatureOne = null;
                                    let physicalFeatureTwo = null;
                                    for(let physicalFeature of physicalFeatures){
                                        if(physicalFeature.id === ancestry.physicalFeatureOneID){
                                            physicalFeatureOne = physicalFeature;
                                        } else if(physicalFeature.id === ancestry.physicalFeatureTwoID){
                                            physicalFeatureTwo = physicalFeature;
                                        }
                                    }
                                    
                                    let ancestryStruct = {ancestry : ancestry, heritages : heritages,
                                        languages : [], bonus_languages : [], boosts : [], flaws : [],
                                        vision_sense : visionSense, additional_sense : additionalSense,
                                        physical_feature_one: physicalFeatureOne, physical_feature_two: 
                                        physicalFeatureTwo};

                                    for (const ancestLang of ancestLangs) {
                                        if(ancestLang.isBonus === 1) {
                                            let language = languages.find(language => {
                                                return language.id === ancestLang.langID;
                                            });
                                            ancestryStruct.bonus_languages.push(language);
                                        } else {
                                            let language = languages.find(language => {
                                                return language.id === ancestLang.langID;
                                            });
                                            ancestryStruct.languages.push(language);
                                        }
                                    }

                                    for (const ancestBoost of ancestBoosts) {
                                      ancestryStruct.boosts.push(ancestBoost.boostedAbility);
                                    }

                                    for (const ancestFlaw of ancestFlaws) {
                                      ancestryStruct.flaws.push(ancestFlaw.flawedAbility);
                                    }

                                    return ancestryStruct;
                                });
                            });
                          });
                      });
                  });
              });
          });
      });
  }

    static getAllBackgrounds(homebrewID=null) {
        return Background.findAll({
          order: [['name', 'ASC'],],
          where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        }).then((backgrounds) => {
            return backgrounds;
        });
    }

    static getBackground(backgroundID, homebrewID=null) {
      return Background.findOne({ where: { id: backgroundID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((background) => {
        return {
          background : background,
        };
      });
    }

    static getAllFeats(homebrewID=null) {
        return Feat.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
        .then((feats) => {
            return FeatTag.findAll()
            .then((featTags) => {
                return Tag.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
                .then((tags) => {
    
                    let featMap = new Map();

                    for (const feat of feats) {
                        let fTags = [];
                        /*
                            If a feat has a genTypeName then it's a single feat for a class, ancestry, or uniHeritage.
                            Search and give it the trait for that class, ancestry, or uniHeritage.
                        */
                        if(feat.genTypeName != null){
                            let tag = tags.find(tag => {
                                if(tag.isArchived == 0){
                                    return tag.name === feat.genTypeName;
                                } else {
                                    return false;
                                }
                            });
                            if(tag != null){
                                fTags.push(tag);
                            }
                        }
                        featMap.set(feat.id, {Feat : feat, Tags : fTags});
                    }

                    for (const featTag of featTags) {

                        let tag = tags.find(tag => {
                            return tag.id === featTag.tagID;
                        });

                        let featStruct = featMap.get(featTag.featID);
                        if(featStruct != null){
                          featStruct.Tags.push(tag);
                        }

                    }

                    return mapToObj(featMap);
    
                });
            });
        });
    }

    static getFeat(featID, homebrewID=null) {
      return Feat.findOne({ where: { id: featID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((feat) => {
        return FeatTag.findAll({ where: { featID: featID } })
        .then((featTags) => {
          let featTagPromises = [];
          for(const featTag of featTags) {
              let newPromise = Tag.findOne({ where: { id: featTag.tagID } });
              featTagPromises.push(newPromise);
          }
          return Promise.all(featTagPromises)
          .then(function(tags) {
            return {
              feat : feat,
              traits : tags,
            };
          });
        });
      });
    }

    static getAllSpells(homebrewID=null) {
        return Spell.findAll({
            order: [['level', 'ASC'],['name', 'ASC'],],
            where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        })
        .then((spells) => {
            return TaggedSpell.findAll()
            .then((taggedSpells) => {
                return Tag.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
                .then((tags) => {
    
                    let spellMap = new Map();

                    for (const spell of spells) {
                        spellMap.set(spell.id, {Spell : spell, Tags : []});
                    }

                    for (const taggedSpell of taggedSpells) {

                        let tag = tags.find(tag => {
                            return tag.id === taggedSpell.tagID;
                        });

                        let spellStruct = spellMap.get(taggedSpell.spellID);
                        if(spellStruct != null){
                          spellStruct.Tags.push(tag);
                        }

                    }

                    return spellMap;
    
                });
            });
        });
    }

    static getSpell(spellID, homebrewID=null) {
      return Spell.findOne({ where: { id: spellID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((spell) => {
        return TaggedSpell.findAll({ where: { spellID: spellID } })
        .then((spellTags) => {
          let spellTagPromises = [];
          for(const spellTag of spellTags) {
              let newPromise = Tag.findOne({ where: { id: spellTag.tagID } });
              spellTagPromises.push(newPromise);
          }
          return Promise.all(spellTagPromises)
          .then(function(tags) {
            return {
              spell : spell,
              traits : tags,
            };
          });
        });
      });
    }

    static getAllSkills() {
      return Skill.findAll()
      .then((skills) => {
        let skillMap = new Map();
        for(let skillData of skills){
          skillMap.set(skillData.name, {
            Name : skillData.name,
            Skill : skillData
          });
        }
        return mapToObj(skillMap);
      });
    }

    static getAllConditions() {
      return Condition.findAll()
      .then((allConditions) => {
        return allConditions;
      });
    }

    static getAllLanguages() {
      return Language.findAll()
      .then((allLanguages) => {
        return allLanguages;
      });
    }

    static getAllItems(homebrewID=null){

        console.log('~~~~~~~~~~~ ADMIN - REQUESTING ALL ITEMS ~~~~~~~~~~~');
        
        return Item.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
        .then((items) => {
            return Tag.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
            .then((tags) => {
                return TaggedItem.findAll()
                .then((taggedItems) => {
                    return Weapon.findAll()
                    .then((weapons) => {
                        return Armor.findAll()
                        .then((armors) => {
                            return Storage.findAll()
                            .then((storages) => {
                                return Shield.findAll()
                                .then((shields) => {
                                    return ItemRune.findAll()
                                    .then((runes) => {
                                                
                                        let itemMap = new Map();

                                        for(const item of items){

                                            let tagArray = [];
                                            for(const taggedItem of taggedItems){
                                                if(taggedItem.itemID == item.id) {

                                                    let tag = tags.find(tag => {
                                                        return tag.id == taggedItem.tagID;
                                                    });
            
                                                    tagArray.push({
                                                        Tag : tag
                                                    });

                                                }
                                            }

                                            let weapon = weapons.find(weapon => {
                                                return weapon.itemID == item.id;
                                            });

                                            let armor = armors.find(armor => {
                                                return armor.itemID == item.id;
                                            });

                                            let storage = storages.find(storage => {
                                                return storage.itemID == item.id;
                                            });

                                            let shield = shields.find(shield => {
                                                return shield.itemID == item.id;
                                            });

                                            let rune = runes.find(rune => {
                                                return rune.itemID == item.id;
                                            });

                                            itemMap.set(item.id, {
                                                Item : item,
                                                WeaponData : weapon,
                                                ArmorData : armor,
                                                StorageData : storage,
                                                ShieldData : shield,
                                                RuneData : rune,
                                                TagArray : tagArray
                                            });

                                        }

                                        return itemMap;
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    static getItem(itemID, homebrewID=null) {
      return Item.findOne({ where: { id: itemID, homebrewID: { [Op.or]: [null,homebrewID] } } })
      .then((item) => {
        return TaggedItem.findAll({ where: { itemID: itemID } })
        .then((itemTags) => {
          let itemTagPromises = [];
          for(const itemTag of itemTags) {
              let newPromise = Tag.findOne({ where: { id: itemTag.tagID } });
              itemTagPromises.push(newPromise);
          }
          return Promise.all(itemTagPromises)
          .then(function(tags) {
            return Weapon.findOne({ where: { itemID: itemID } })
            .then((weaponData) => {
              return Armor.findOne({ where: { itemID: itemID } })
              .then((armorData) => {
                return Storage.findOne({ where: { itemID: itemID } })
                .then((storageData) => {
                  return Shield.findOne({ where: { itemID: itemID } })
                  .then((shieldData) => {
                    return ItemRune.findOne({ where: { itemID: itemID } })
                    .then((runeData) => {
                      return {
                        item : item,
                        traits : tags,
                        data_weapon : (weaponData != null) ? weaponData : undefined,
                        data_armor : (armorData != null) ? armorData : undefined,
                        data_storage : (storageData != null) ? storageData : undefined,
                        data_shield : (shieldData != null) ? shieldData : undefined,
                        data_rune : (runeData != null) ? runeData : undefined,
                      };
                    });
                  });
                });
              });
            });
          });
        });
      });
    }

    static getAllAncestries(includeTag, homebrewID=null) {

        console.log('~~~~~~~~~~~ ADMIN - REQUESTING ALL ANCESTRIES ~~~~~~~~~~~');

        return Ancestry.findAll({
          where: { homebrewID: { [Op.or]: [null,homebrewID] } }
        }).then((ancestries) => {
            return Heritage.findAll({
                order: [['name', 'ASC'],]
            })
            .then((heritages) => {
                return Language.findAll()
                .then((languages) => {
                    return AncestryLanguage.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
                    .then((ancestLangs) => {
                        return AncestryBoost.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
                        .then((ancestBoosts) => {
                            return AncestryFlaw.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
                            .then((ancestFlaws) => {
                                return Tag.findAll({ where: { homebrewID: { [Op.or]: [null,homebrewID] } } })
                                .then((tags) => {
                                    return SenseType.findAll()
                                    .then((senseTypes) => {
                                        return CharGathering.getAllPhysicalFeatures()
                                        .then((physicalFeatures) => {

                                            let ancestryMap = new Map();

                                            for (const ancestry of ancestries) {
                                                let tag = null;
                                                if(includeTag){
                                                    tag = tags.find(tag => {
                                                        return tag.id === ancestry.tagID;
                                                    });
                                                }
                                                let visionSense, additionalSense = null;
                                                for(let senseType of senseTypes){
                                                    if(senseType.id === ancestry.visionSenseID){
                                                        visionSense = senseType;
                                                    } else if(senseType.id === ancestry.additionalSenseID){
                                                        additionalSense = senseType;
                                                    }
                                                }
                                                let physicalFeatureOne, physicalFeatureTwo = null;
                                                for(let physicalFeature of physicalFeatures){
                                                    if(physicalFeature.id === ancestry.physicalFeatureOneID){
                                                        physicalFeatureOne = physicalFeature;
                                                    } else if(physicalFeature.id === ancestry.physicalFeatureTwoID){
                                                        physicalFeatureTwo = physicalFeature;
                                                    }
                                                }
                                                ancestryMap.set(ancestry.id, {Ancestry : ancestry, Heritages : [],
                                                    Languages : [], BonusLanguages : [], Boosts : [], Flaws : [],
                                                    Tag : tag, VisionSense : visionSense, AdditionalSense : additionalSense,
                                                    PhysicalFeatureOne: physicalFeatureOne, PhysicalFeatureTwo: 
                                                    physicalFeatureTwo});
                                            }

                                            for (const heritage of heritages) {

                                                let ancestryID = null;
                                                if(heritage.ancestryID != null){
                                                    ancestryID = heritage.ancestryID;
                                                } else if(heritage.indivAncestryName != null){
                                                    let ancestry = ancestries.find(ancestry => {
                                                        return ancestry.isArchived == 0 && ancestry.name === heritage.indivAncestryName;
                                                    });
                                                    if(ancestry != null){
                                                        ancestryID = ancestry.id;
                                                    }
                                                }
                                                let ancestryStruct = ancestryMap.get(ancestryID);
                                                if(ancestryStruct != null){
                                                    ancestryStruct.Heritages.push(heritage);
                                                }

                                            }

                                            for (const ancestLang of ancestLangs) {

                                                if(ancestLang.isBonus === 1) {

                                                    let language = languages.find(language => {
                                                        return language.id === ancestLang.langID;
                                                    });
                            
                                                    let ancestryStruct = ancestryMap.get(ancestLang.ancestryID);
                                                    if(ancestryStruct != null){
                                                      ancestryStruct.BonusLanguages.push(language);
                                                    }

                                                } else {

                                                    let language = languages.find(language => {
                                                        return language.id === ancestLang.langID;
                                                    });
                            
                                                    let ancestryStruct = ancestryMap.get(ancestLang.ancestryID);
                                                    if(ancestryStruct != null){
                                                      ancestryStruct.Languages.push(language);
                                                    }

                                                }

                                            }

                                            for (const ancestBoost of ancestBoosts) {

                                                let ancestryStruct = ancestryMap.get(ancestBoost.ancestryID);
                                                if(ancestryStruct != null){
                                                  ancestryStruct.Boosts.push(ancestBoost.boostedAbility);
                                                }

                                            }

                                            for (const ancestFlaw of ancestFlaws) {

                                                let ancestryStruct = ancestryMap.get(ancestFlaw.ancestryID);
                                                if(ancestryStruct != null){
                                                  ancestryStruct.Flaws.push(ancestFlaw.flawedAbility);
                                                }

                                            }

                                            return mapToObj(ancestryMap);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

};