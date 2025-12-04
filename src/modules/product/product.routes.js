// src/interfaces/http/routes/product.routes.js

const express = require("express");
const router = express.Router();

const productController = require("./product.controller");
// const langMiddleware = require("../middleware/lang.middleware");

// // Middleware langue pour toutes les routes produits
// router.use(langMiddleware);

/**
 * @route POST /api/products
 * @desc Создать новый продукт
 */
router.post("/products", (req, res) =>
  productController.createProduct(req, res)
);

/**
 * @route GET /api/products/:id/details
 * @desc Получить подробную информацию о продукте
 */
router.get("/products/:id/details", (req, res) =>
  productController.getProductDetails(req, res)
);

/**
 * @route GET /api/products/qr/:qrCode
 * @desc Получить продукты и коллекцию по QR-коду
 */
router.get("/products/qr/:qrCode", (req, res) =>
  productController.getByQrCode(req, res)
);

/**
 * @route PATCH /api/products/:id/status
 * @desc Обновить статус продукта
 */
router.patch("/products/:id/status", (req, res) =>
  productController.updateStatus(req, res)
);

module.exports = router;
