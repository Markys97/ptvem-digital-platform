// src/loaders/mongo.js
const mongoose = require("mongoose");
const config = require("../config");

async function initMongo() {
  try {
    await mongoose.connect(config.mongo.uri, config.mongo.options);
    console.log("✅ MongoDB connected:", config.mongo.uri);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    // dans un microservice, on peut arrêter le process si la DB est critique
    process.exit(1);
  }
}

module.exports = initMongo;
