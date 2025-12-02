// src/infra/db/models/productCategory.model.js
const mongoose = require("mongoose");
const LocalizedString = require("../schemas/localizedString.schema");

const ProductCategorySchema = new mongoose.Schema(
  {
    /**
     * Identifiant business unique
     * Exemple : "cat_tshirt", "cat_hoodie"
     * Différent du _id Mongo
     */
    id: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * Nom multilingue de la catégorie
     * - T-shirt
     * - Hoodie
     * - Casquette
     * - Culotte
     * etc.
     */
    name: {
      type: LocalizedString,
      required: true,
    },

    /**
     * Code court NORMALISÉ pour usage technique
     * Exemple :
     * - T_SHIRT
     * - HOODIE
     * - CAP
     * - UNDERWEAR
     */
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    /**
     * Description multilingue
     * -> pour UI admin, documentation produit, futur e-commerce
     */
    description: {
      type: LocalizedString,
      default: {},
    },

    /**
     * Liste des tailles autorisées pour cette catégorie
     * Exemple :
     * T-shirt : ["XS","S","M","L","XL"]
     * Hoodie : ["S","M","L","XL","XXL"]
     * Casquette : ["ONE_SIZE"]
     */
    allowedSizes: {
      type: [String],
      default: [],
    },

    /**
     * Métadonnées techniques spécifiques à la catégorie
     * (optionnel)
     * Exemple :
     * - typeCouture: "flatlock"
     * - neckline: "round"
     */
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
/*

{
  "id": "cat_tshirt",
  "name": {
    "fr": "T-shirt",
    "en": "T-shirt",
    "ru": "Футболка"
  },
  "code": "T_SHIRT",
  "description": {
    "fr": "T-shirt coupe unisexe",
    "en": "Unisex classic fit t-shirt",
    "ru": "Унисекс футболка классического кроя"
  },
  "allowedSizes": ["S","M","L","XL"],
  "metadata": {
    "fabrication": "30 min",
    "recommendedMaterial": "Coton 180g"
  }
}

 */
