// src/loaders/routes.js

const productRoutes = require("../interfaces/http/routes/product.routes");

module.exports = function initRoutes(app) {
  // Prefix global pour l'API
  app.use("/api", productRoutes);

  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "product-service" });
  });
};
