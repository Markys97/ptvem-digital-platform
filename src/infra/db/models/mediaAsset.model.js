// src/infra/db/models/mediaAsset.model.js
const mongoose = require("mongoose");
const LocalizedString = require("../schemas/localizedString.schema");

const MediaAssetSchema = new mongoose.Schema(
  {
    /**
     * Identifiant business du média
     * ex: "media_452"
     */
    id: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * Type d'entité propriétaire :
     * - PRODUCT
     * - COLLECTION
     * - CAMPAIGN (futur)
     */
    ownerType: {
      type: String,
      enum: ["PRODUCT", "COLLECTION", "CAMPAIGN"],
      required: true,
    },

    /**
     * ID du propriétaire (prod_123, col_501, camp_001)
     */
    ownerId: {
      type: String,
      required: true,
    },

    /**
     * IMAGE ou VIDEO
     */
    kind: {
      type: String,
      enum: ["IMAGE", "VIDEO"],
      required: true,
    },

    /**
     * Rôle fonctionnel du média :
     * - PRODUCT_GALLERY      (angles produit)
     * - PRODUCT_LIFESTYLE    (produit porté / mannequin)
     * - COLLECTION_HERO      (visuel principal d'une collection)
     * - COLLECTION_PROMO     (images promotionnelles)
     * - AD_CREATIVE          (créa pub, bannière, vidéo marketing)
     */
    role: {
      type: String,
      enum: [
        "PRODUCT_GALLERY",
        "PRODUCT_LIFESTYLE",
        "COLLECTION_HERO",
        "COLLECTION_PROMO",
        "AD_CREATIVE",
      ],
      required: true,
    },

    /**
     * Variante :
     * front, back, detail, model_pose, hero, teaser...
     */
    variant: {
      type: String,
      default: null,
    },

    /**
     * URL du fichier (local dans MVP, CDN plus tard)
     */
    url: {
      type: String,
      required: true,
    },

    /**
     * Miniature (optionnelle)
     */
    thumbnailUrl: {
      type: String,
      default: null,
    },

    /**
     * Texte alternatif multilingue (accessibilité + SEO)
     */
    altText: {
      type: LocalizedString,
      default: {},
    },

    /**
     * Pour les vidéos : durée, résolution, fps
     * Pour les images : résolution, format, poids
     */
    metadata: {
      type: Object,
      default: {},
    },

    /**
     * Ordre d'affichage pour les galeries
     */
    position: {
      type: Number,
      default: 0,
    },

    /**
     * Image principale (true/false)
     */
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MediaAsset", MediaAssetSchema);

/*
{
  "id": "media_552",
  "ownerType": "PRODUCT",
  "ownerId": "prod_987",
  "kind": "IMAGE",
  "role": "PRODUCT_GALLERY",
  "variant": "FRONT",
  "url": "/uploads/products/prod_987/gallery/front.jpg",
  "thumbnailUrl": "/uploads/products/prod_987/gallery/front_thumb.jpg",
  "altText": {
    "fr": "Hoodie PTVEM noir, vue de face",
    "en": "PTVEM black hoodie, front view",
    "ru": "Худи PTVEM черный, вид спереди"
  },
  "metadata": {
    "width": 1080,
    "height": 1350,
    "format": "jpg",
    "sizeKb": 240
  },
  "position": 1,
  "isPrimary": true
}


*/
