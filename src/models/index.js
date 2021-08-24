'use strict';

POSTGRES_URI = process.env.POSTGRES_UPI || "postgres://postgres@localhost:5432/bearerAuth"
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./user-model')

let sequelize = new Sequelize (POSTGRES_URI, {});

const userModel  = users(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
}