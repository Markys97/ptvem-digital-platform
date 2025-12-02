// src/loaders/index.js
const initMongo = require("./mongo");
const initExpress = require("./express");

async function initLoaders(app) {
  // ordre important : d’abord la DB, puis le reste
  await initMongo();
  initExpress(app);
}

module.exports = initLoaders;
