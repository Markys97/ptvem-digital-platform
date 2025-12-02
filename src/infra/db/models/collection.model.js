// src/infra/db/models/collection.model.js
const mongoose = require("mongoose");
const LocalizedString = require("../schemas/localizedString.schema");

const CollectionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      // ex: "col_501"
    },

    code: {
      type: String,
      required: true,
      unique: true,
      // ex: "501" (le code court de la collection)
    },

    name: {
      type: LocalizedString,
      required: true,
      // ex: { fr: "DROP 501", en: "DROP 501", ru: "ДРОП 501" }
    },

    description: {
      type: LocalizedString,
      default: {},
      // description courte dans 3 langues
    },

    designStory: {
      type: LocalizedString,
      default: {},
      // histoire/vision artistique de la collection
    },

    /**
     * QR unique pour la collection
     * Tous les produits de cette collection utiliseront ce QR
     */
    qrCode: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * Médias
     */
    heroMediaId: {
      type: String,
      default: null,
      // Image/video principale de la collection
    },

    promoMediaIds: {
      type: [String],
      default: [],
      // Liste d'autres médias (teasers, affiches, vidéos)
    },

    /**
     * Métadonnées supplémentaires
     * Peut contenir : saison, thème, palette de couleurs, etc.
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

module.exports = mongoose.model("Collection", CollectionSchema);

// {
//   "id": "col_501",
//   "code": "501",
//   "name": {
//     "fr": "PTVEM DROP 501",
//     "en": "PTVEM DROP 501",
//     "ru": "ПТВЕМ ДРОП 501"
//   },
//   "description": {
//     "fr": "Collection inspirée des rues de Paris",
//     "en": "Collection inspired by the streets of Paris",
//     "ru": "Коллекция вдохновлена улицами Парижа"
//   },
//   "designStory": {
//     "fr": "Une vision artistique urbaine...",
//     "en": "Urban creative vision...",
//     "ru": "Городское творческое видение..."
//   },
//   "qrCode": "PTVEM-501-QRABCXYZ",
//   "heroMediaId": "media_120",
//   "promoMediaIds": ["media_121", "media_122"],
//   "metadata": {
//     "season": "Spring 2025",
//     "theme": "Urban Freedom"
//   },
//   "createdAt": "2024-01-15T10:00:00Z",
//   "updatedAt": "2024-01-15T10:00:00Z"
// }
