// src/infra/db/models/product.model.js
const mongoose = require("mongoose");
const LocalizedString = require("../schemas/localizedString.schema");

const ProductSchema = new mongoose.Schema(
  {
    /**
     * Identifiant business unique du produit
     * (différent du _id Mongo)
     */
    id: {
      type: String,
      required: true,
      unique: true,
      // ex: "prod_12345"
    },

    /**
     * Référence vers la collection
     * Tous les produits d'une collection partagent le même QR
     */
    collectionId: {
      type: String,
      required: true,
      // ex: "col_501"
    },

    /**
     * Référence vers la catégorie du produit
     * Exemple : cat_tshirt, cat_hoodie...
     */
    categoryId: {
      type: String,
      required: true,
    },

    /**
     * Numéro individuel au sein de la collection
     * Exemple : "501-000123"
     */
    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * Nom du produit (multilingue)
     * Peut reprendre le nom de la collection + variation
     */
    name: {
      type: LocalizedString,
      required: true,
    },

    /**
     * Description courte multilingue
     */
    description: {
      type: LocalizedString,
      default: {},
    },

    /**
     * Identité visuelle principale
     * Référence vers MediaAsset
     */
    primaryMediaId: {
      type: String,
      default: null,
    },

    /**
     * Caractéristiques techniques du produit :
     * - taille
     * - couleur
     * - matière
     * - coupe
     * - fabricant
     * etc.
     */
    specifications: {
      type: Object,
      default: {},
      // ex: { size: "L", color: "Black", material: "100% coton" }
    },

    /**
     * Matériaux détaillés
     */
    materials: {
      type: [String],
      default: [],
    },

    /**
     * Date de fabrication
     */
    manufactureDate: {
      type: Date,
      default: null,
    },

    /**
     * Statut business du produit
     * manufactured, in_stock, sold, returned, destroyed, etc.
     */
    status: {
      type: String,
      enum: [
        "manufactured",
        "in_stock",
        "sold",
        "returned",
        "recycled",
        "destroyed",
      ],
      default: "manufactured",
    },

    /**
     * QR code de la collection (copie pour accessibilité rapide)
     */
    qrCode: {
      type: String,
      required: true,
    },

    /**
     * Métadonnées libres extensibles
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

module.exports = mongoose.model("Product", ProductSchema);

/*
{
  "id": "prod_987",
  "collectionId": "col_501",
  "categoryId": "cat_hoodie",
  "serialNumber": "501-000987",
  "name": {
    "fr": "Hoodie PTVEM DROP 501 Noir",
    "en": "PTVEM DROP 501 Black Hoodie",
    "ru": "Худи PTVEM DROP 501 Черный"
  },
  "description": {
    "fr": "Hoodie épais unisexe, édition limitée",
    "en": "Unisex heavyweight hoodie, limited edition",
    "ru": "Унисекс худи премиум класса, лимитированная серия"
  },
  "primaryMediaId": "media_124",
  "specifications": {
    "size": "L",
    "color": "Black",
    "material": "100% coton"
  },
  "materials": ["cotton"],
  "manufactureDate": "2024-01-22T00:00:00Z",
  "status": "manufactured",
  "qrCode": "PTVEM-501-QRABCXYZ"
}
  */
