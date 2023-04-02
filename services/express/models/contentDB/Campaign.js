const Sequelize = require("sequelize");
const db = require("../../config/databases/content-database");

const Campaign = db.define("campaigns", {
  userID: {
    type: Sequelize.INTEGER,
  },
  accessID: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  optionDisplayPlayerHealth: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Campaign;
