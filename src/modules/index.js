// src/modules/index.js
const { Router } = require("express");

const router = Router();

// Health check (pour Kubernetes, Docker, monitoring…)
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ptvem-product-service",
    timestamp: new Date().toISOString(),
  });
});

// plus tard : router.use('/products', require('./product/product.routes'));

module.exports = router;
