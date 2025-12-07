const CollectionService = require("../../domain/services/collection.service");

class CollectionController {
  // CREATE - Créer une collection
  async create(req, res) {
    try {
      const collection = await CollectionService.createCollection(req.body);
      return res.status(201).json(collection);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // READ - Récupérer une collection par son ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await CollectionService.getCollectionById(id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  // READ - Récupérer une collection par son QR code
  async getByQrCode(req, res) {
    try {
      const { qrCode } = req.params;
      const result = await CollectionService.getCollectionByQrCode(qrCode);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  // UPDATE - Mettre à jour une collection
  async update(req, res) {
    try {
      const { id } = req.params;
      const collection = await CollectionService.updateCollection(id, req.body);
      return res.status(200).json(collection);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // UPDATE - Définir l'image héroïne (hero media) d'une collection
  async setHeroMedia(req, res) {
    try {
      const { id } = req.params;
      const { mediaId } = req.body;

      if (!mediaId) {
        return res.status(400).json({ error: "mediaId est requis" });
      }

      const collection = await CollectionService.setHeroMedia(id, mediaId);
      return res.status(200).json(collection);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // DELETE - Supprimer une collection
  async delete(req, res) {
    try {
      const { id } = req.params;
      await CollectionService.deleteCollection(id);
      return res
        .status(200)
        .json({ message: "Collection supprimée avec succès" });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new CollectionController();
