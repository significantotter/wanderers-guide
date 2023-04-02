const Sequelize = require("sequelize");
const db = require("../../config/databases/content-database");

const Item = db.define("items", {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  bulk: {
    type: Sequelize.DOUBLE,
  },
  level: {
    type: Sequelize.INTEGER,
  },
  rarity: {
    type: Sequelize.ENUM,
    values: ["COMMON", "UNCOMMON", "RARE", "UNIQUE"],
  },
  description: {
    type: Sequelize.TEXT,
  },
  itemType: {
    type: Sequelize.ENUM,
    values: [
      "POTION",
      "ARTIFACT",
      "BOMB",
      "ROD",
      "BOOK",
      "ELIXIR",
      "POISON",
      "COMPANION",
      "DRUG",
      "ARMOR",
      "STORAGE",
      "TOOL",
      "AMMUNITION",
      "GIFT",
      "OIL",
      "SCROLL",
      "STAFF",
      "STRUCTURE",
      "TALISMAN",
      "TATTOO",
      "FULU",
      "CATALYST",
      "SPELLHEART",
      "ADJUSTMENT",
      "GRIMOIRE",
      "SNARE",
      "GADGET",
      "SIEGE",
      "KIT",
      "INGREDIENT",
      "INSTRUMENT",
      "OTHER",
      "WEAPON",
      "SHIELD",
      "RUNE",
      "WAND",
      "CURRENCY",
      "HAT",
      "NECKLACE",
      "BRACERS",
      "CLOAK",
      "RING",
      "MASK",
      "GLOVES",
      "BELT",
      "BOOTS",
      "EYEPIECE",
      "CIRCLET",
    ],
  },
  craftRequirements: {
    type: Sequelize.STRING,
  },
  usage: {
    type: Sequelize.STRING,
  },
  hands: {
    type: Sequelize.ENUM,
    values: ["NONE", "ONE", "ONE_PLUS", "TWO"],
  },
  size: {
    type: Sequelize.ENUM,
    values: ["TINY", "SMALL", "MEDIUM", "LARGE", "HUGE", "GARGANTUAN"],
  },
  isShoddy: {
    type: Sequelize.INTEGER,
  },
  hasQuantity: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  materialType: {
    type: Sequelize.STRING,
  },
  hitPoints: {
    type: Sequelize.INTEGER,
  },
  brokenThreshold: {
    type: Sequelize.INTEGER,
  },
  hardness: {
    type: Sequelize.INTEGER,
  },
  hidden: {
    type: Sequelize.INTEGER,
  },
  code: {
    type: Sequelize.TEXT,
  },
  itemStructType: {
    type: Sequelize.ENUM,
    values: ["GENERAL", "WEAPON", "ARMOR", "SHIELD", "STORAGE", "RUNE"],
  },
  isArchived: {
    type: Sequelize.INTEGER,
  },
  contentSrc: {
    type: Sequelize.STRING,
  },
  homebrewID: {
    type: Sequelize.INTEGER,
  },
  version: {
    type: Sequelize.STRING,
  },
});

module.exports = Item;
