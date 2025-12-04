// src/infra/db/repositories/category.repository.js
const ProductCategoryModel = require("../models/productCategory.model");

/**
 * ProductCategoryRepository
 * Только CRUD и запросы к базе данных.
 * Никакой бизнес-логики.
 */
class ProductCategoryRepository {
  /**
   * Создать категорию продукта
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const doc = await ProductCategoryModel.create(data);
    return doc.toObject();
  }

  /**
   * Найти категорию по бизнес-id (например, "cat_tshirt")
   * @param {string} id
   */
  async findById(id) {
    return ProductCategoryModel.findOne({ id }).lean().exec();
  }

  /**
   * Найти категорию по коду ("T_SHIRT", "HOODIE", "CAP")
   * Важно для ProductService.createProduct()
   * @param {string} code
   */
  async findByCode(code) {
    return ProductCategoryModel.findOne({ code }).lean().exec();
  }

  /**
   * Получить список всех категорий
   * @param {Object} options
   * @param {number} options.limit
   * @param {number} options.offset
   */
  async findAll(options = {}) {
    const { limit = 50, offset = 0 } = options;

    return ProductCategoryModel.find().skip(offset).limit(limit).lean().exec();
  }

  /**
   * Найти несколько категорий по списку id
   */
  async findManyByIds(ids) {
    if (!ids || ids.length === 0) return [];
    return ProductCategoryModel.find({ id: { $in: ids } })
      .lean()
      .exec();
  }

  /**
   * Обновить категорию
   * @param {string} id
   * @param {Object} updates
   */
  async updateById(id, updates) {
    return ProductCategoryModel.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    )
      .lean()
      .exec();
  }

  /**
   * Удалить категорию (используется редко)
   * @param {string} id
   */
  async deleteById(id) {
    const res = await ProductCategoryModel.deleteOne({ id }).exec();
    return res.deletedCount > 0;
  }
}

module.exports = new ProductCategoryRepository();
