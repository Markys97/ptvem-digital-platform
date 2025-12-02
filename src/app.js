// src/app.js
const express = require("express");
const initLoaders = require("./loaders");

async function createApp() {
  const app = express();

  await initLoaders(app);

  return app;
}

module.exports = createApp;
