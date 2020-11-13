
const router = require('express').Router();

const { Op } = require("sequelize");

const HomebrewBundle = require('../../models/contentDB/HomebrewBundle');
const Class = require('../../models/contentDB/Class');
const ClassAbility = require('../../models/contentDB/ClassAbility');
const Background = require('../../models/contentDB/Background');
const Ancestry = require('../../models/contentDB/Ancestry');
const Heritage = require('../../models/contentDB/Heritage');
const Item = require('../../models/contentDB/Item');
const Spell = require('../../models/contentDB/Spell');
const Language = require('../../models/contentDB/Language');
const Tag = require('../../models/contentDB/Tag');
const SenseType = require('../../models/contentDB/SenseType');
const PhysicalFeature = require('../../models/contentDB/PhysicalFeature');
const Feat = require('../../models/contentDB/Feat');
const Skill = require('../../models/contentDB/Skill');
const Archetype = require('../../models/contentDB/Archetype');
const UniHeritage = require('../../models/contentDB/UniHeritage');

router.get('/', (req, res) => {

  let editHomebrewID = parseInt(req.query.edit_id); if(isNaN(editHomebrewID)){editHomebrewID=null;}
  let viewHomebrewID = parseInt(req.query.view_id); if(isNaN(viewHomebrewID)){viewHomebrewID=null;}
  let homebrewTabName = req.query.sub_tab;

  res.render('pages/homebrew', {
    title: "Homebrew - Wanderer's Guide",
    user: req.user,
    editHomebrewID,
    viewHomebrewID,
    homebrewTabName,
  });
});

const bundleAuthCheck = (req, res, next) => {
  let bundleID = parseInt(req.query.id);
  if(isNaN(bundleID)){
    res.redirect('/homebrew');
  } else {
    HomebrewBundle.findOne({ where: { id: bundleID, userID: req.user.id } })
    .then((homebrewBundle) => {
      if(homebrewBundle.isPublished === 0) {
        next();
      } else {
        res.redirect('/homebrew');
      }
    }).catch((error) => {
      res.redirect('/homebrew');
    });
  }
};

//// Class ////

router.get('/create/class', bundleAuthCheck, (req, res) => {

    let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

    Tag.findAll({
        where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
        order: [['name', 'ASC'],]
    }).then((tags) => {
        Item.findAll({
            where: { isArchived: 0, hidden: 0, homebrewID: { [Op.or]: [null,bundleID] }, itemStructType: 'WEAPON' },
            order: [['name', 'ASC'],]
        }).then((weaponItems) => {
            res.render('homebrew/builder_class', {
                title: "Class Builder - Wanderer's Guide",
                user: req.user,
                tags,
                weaponItems,
                bundleID: bundleID,
            });
        });
    });

});

router.get('/edit/class', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let classID = parseInt(req.query.class_id); if(isNaN(classID)){classID=null;}

  Tag.findAll({
      where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
      order: [['name', 'ASC'],]
  }).then((tags) => {
      Item.findAll({
          where: { isArchived: 0, hidden: 0, homebrewID: { [Op.or]: [null,bundleID] }, itemStructType: 'WEAPON' },
          order: [['name', 'ASC'],]
      }).then((weaponItems) => {
          res.render('homebrew/builder_class', {
              title: "Class Builder - Wanderer's Guide",
              user: req.user,
              tags,
              weaponItems,
              classID: classID,
              bundleID: bundleID,
          });
      });
  });
  
});

//// Ancestry ////

router.get('/create/ancestry', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  Language.findAll({
    order: [['name', 'ASC'],]
  }).then((languages) => {
    Tag.findAll({
        where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
        order: [['name', 'ASC'],]
    }).then((tags) => {
        SenseType.findAll()
        .then((senseTypes) => {
            PhysicalFeature.findAll()
            .then((physicalFeatures) => {

                res.render('homebrew/builder_ancestry', {
                    title: "Ancestry Builder - Wanderer's Guide",
                    user: req.user,
                    languages,
                    tags,
                    senseTypes,
                    physicalFeatures,
                    bundleID: bundleID,
                });

            });
        });
    });
  });

});

router.get('/edit/ancestry', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let ancestryID = parseInt(req.query.ancestry_id); if(isNaN(ancestryID)){ancestryID=null;}

  Language.findAll({
    order: [['name', 'ASC'],]
  }).then((languages) => {
    Tag.findAll({
        where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
        order: [['name', 'ASC'],]
    }).then((tags) => {
        SenseType.findAll()
        .then((senseTypes) => {
            PhysicalFeature.findAll()
            .then((physicalFeatures) => {

                res.render('homebrew/builder_ancestry', {
                    title: "Ancestry Builder - Wanderer's Guide",
                    user: req.user,
                    languages,
                    tags,
                    senseTypes,
                    physicalFeatures,
                    bundleID: bundleID,
                    ancestryID: ancestryID,
                });

            });
        });
    });
  });

});

//// Archetype ////

router.get('/create/archetype', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  Tag.findAll({
      where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
      order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_archetype', {
      title: "Archetype Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
    });
  });

});

router.get('/edit/archetype', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let archetypeID = parseInt(req.query.archetype_id); if(isNaN(archetypeID)){archetypeID=null;}

  Tag.findAll({
    where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
    order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_archetype', {
      title: "Archetype Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
      archetypeID: archetypeID,
    });
  });

});

//// Background ////

router.get('/create/background', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  res.render('homebrew/builder_background', {
    title: "Background Builder - Wanderer's Guide",
    user: req.user,
    bundleID: bundleID,
  });

});

router.get('/edit/background', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let backgroundID = parseInt(req.query.background_id); if(isNaN(backgroundID)){backgroundID=null;}

  res.render('homebrew/builder_background', {
    title: "Background Builder - Wanderer's Guide",
    user: req.user,
    bundleID: bundleID,
    backgroundID: backgroundID,
  });

});

//// Class Feature ////

router.get('/create/class-feature', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  res.render('homebrew/builder_class-feature', {
    title: "Class Feature Builder - Wanderer's Guide",
    user: req.user,
    bundleID: bundleID,
  });

});

router.get('/edit/class-feature', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let classFeatureID = parseInt(req.query.class_feature_id); if(isNaN(classFeatureID)){classFeatureID=null;}

  res.render('homebrew/builder_class-feature', {
    title: "Class Feature Builder - Wanderer's Guide",
    user: req.user,
    bundleID: bundleID,
    classFeatureID: classFeatureID,
  });

});

//// Feat ////

router.get('/create/feat-activity', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  Skill.findAll({
    order: [['name', 'ASC'],]
  }).then((skills) => {
    Tag.findAll({
      where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
      order: [['name', 'ASC'],]
    }).then((tags) => {
      res.render('homebrew/builder_feat-action', {
        title: "Feat / Activity Builder - Wanderer's Guide",
        user: req.user,
        skills,
        tags,
        bundleID: bundleID,
      });
    });
  });

});

router.get('/edit/feat-activity', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let featID = parseInt(req.query.feat_id); if(isNaN(featID)){featID=null;}

  Skill.findAll({
    order: [['name', 'ASC'],]
  }).then((skills) => {
    Tag.findAll({
      where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
      order: [['name', 'ASC'],]
    }).then((tags) => {
      res.render('homebrew/builder_feat-action', {
        title: "Feat / Activity Builder - Wanderer's Guide",
        user: req.user,
        skills,
        tags,
        bundleID: bundleID,
        featID: featID,
      });
    });
  });

});

//// Heritage ////

router.get('/create/heritage', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  res.render('homebrew/builder_heritage', {
    title: "Heritage Builder - Wanderer's Guide",
    user: req.user,
    bundleID: bundleID,
  });

});

router.get('/edit/heritage', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let heritageID = parseInt(req.query.heritage_id); if(isNaN(heritageID)){heritageID=null;}

  res.render('homebrew/builder_heritage', {
    title: "Heritage Builder - Wanderer's Guide",
    user: req.user,
    bundleID: bundleID,
    heritageID: heritageID,
  });

});

//// Uni-Heritage ////

router.get('/create/uni-heritage', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  Tag.findAll({
    where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
    order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_uni-heritage', {
      title: "Versatile Heritage Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
    });
  });

});

router.get('/edit/uni-heritage', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let uniHeritageID = parseInt(req.query.uni_heritage_id); if(isNaN(uniHeritageID)){uniHeritageID=null;}

  Tag.findAll({
    where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
    order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_uni-heritage', {
      title: "Versatile Heritage Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
      uniHeritageID: uniHeritageID,
    });
  });

});

//// Item ////

router.get('/create/item', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  Tag.findAll({
    where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
    order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_item', {
      title: "Item Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
    });
  });

});

router.get('/edit/item', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let itemID = parseInt(req.query.item_id); if(isNaN(itemID)){itemID=null;}

  Tag.findAll({
    where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
    order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_item', {
      title: "Item Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
      itemID: itemID,
    });
  });

});

//// Spell ////

router.get('/create/spell', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}

  Tag.findAll({
    where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
    order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_spell', {
      title: "Spell Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
    });
  });

});

router.get('/edit/spell', bundleAuthCheck, (req, res) => {

  let bundleID = parseInt(req.query.id); if(isNaN(bundleID)){bundleID=null;}
  let spellID = parseInt(req.query.spell_id); if(isNaN(spellID)){spellID=null;}

  Tag.findAll({
    where: { isArchived: 0, isHidden: 0, homebrewID: { [Op.or]: [null,bundleID] } },
    order: [['name', 'ASC'],]
  }).then((tags) => {
    res.render('homebrew/builder_spell', {
      title: "Spell Builder - Wanderer's Guide",
      user: req.user,
      tags,
      bundleID: bundleID,
      spellID: spellID,
    });
  });

});

module.exports = router;