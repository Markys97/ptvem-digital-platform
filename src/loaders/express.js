// src/loaders/express.js
const express = require("express");
const cors = require("cors");
const routes = require("../modules");
const {
  notFoundHandler,
  errorHandler,
} = require("../common/middleware/errorHandler");

function initExpress(app) {
  // Middlewares globaux
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Prefix commun à toutes les routes du microservice
  app.use("/api", routes);

  // 404 + gestion d’erreurs
  app.use(notFoundHandler);
  app.use(errorHandler);
}

module.exports = initExpress;
