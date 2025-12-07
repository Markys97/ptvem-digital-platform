const express = require("express");
const router = express.Router();
const collectionController = require("./collection.controller");

// CRUD Routes
router.post("/", collectionController.create); // CREATE
router.get("/", collectionController.create); // CREATE
router.get("/:id", collectionController.getById); // READ BY ID
router.get("/qr/:qrCode", collectionController.getByQrCode); // READ BY QR CODE
router.put("/:id", collectionController.update); // UPDATE
router.delete("/:id", collectionController.delete); // DELETE

// Special Routes
router.patch("/:id/hero-media", collectionController.setHeroMedia); // SET HERO MEDIA

module.exports = router;
