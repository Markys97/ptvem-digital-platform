// src/config/index.js
require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  appName: "ptvem-product-service",
  port: process.env.PORT || 4001,

  mongo: {
    uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ptvem_product",
  },
};

module.exports = config;
