// src/modules/index.js
const { Router } = require("express");
const router = Router();

// Import des modules
const productRoutes = require("./product/product.routes");

// Health check (pour Kubernetes, Docker, monitoring…)
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ptvem-product-service",
    timestamp: new Date().toISOString(),
  });
});

// Brancher Product Module
router.use("/products", productRoutes);

// Plus tard :
// const collectionRoutes = require("./collection/collection.routes");
// router.use("/collections", collectionRoutes);

// const categoryRoutes = require("./category/category.routes");
// router.use("/categories", categoryRoutes);

// const mediaRoutes = require("./media/media.routes");
// router.use("/media", mediaRoutes);

module.exports = router;
