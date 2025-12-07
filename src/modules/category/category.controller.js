const CategoryService = require("../../domain/services/category.service");

class CategoryController {
  async create(req, res) {
    try {
      const category = await CategoryService.createCategory(req.body);
      return res.status(201).json(category);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // READ - Récupérer toutes les catégories
  async getAll(req, res) {
    try {
      const categories = await CategoryService.listCategories();
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // READ - Récupérer une catégorie par ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      return res.status(200).json(category);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new CategoryController();
