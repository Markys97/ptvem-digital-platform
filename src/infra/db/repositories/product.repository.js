// src/infra/db/repositories/product.repository.js
const ProductModel = require("../models/product.model");

/**
 * ProductRepository
 * Отвечает только за работу с базой данных (MongoDB/Mongoose)
 * Никакой бизнес-логики, только CRUD / запросы.
 */
class ProductRepository {
  /**
   * Создать новый продукт
   * @param {Object} data - данные продукта (соответствуют схеме Product)
   * @returns {Promise<Object>} созданный продукт (plain object)
   */
  async create(data) {
    const doc = await ProductModel.create(data);
    return doc.toObject();
  }

  /**
   * Найти продукт по бизнес-id (поле id, не _id Mongo)
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return ProductModel.findOne({ id }).lean().exec();
  }

  /**
   * Найти продукт по Mongo _id (если нужно)
   * @param {string} mongoId
   * @returns {Promise<Object|null>}
   */
  async findByMongoId(mongoId) {
    return ProductModel.findById(mongoId).lean().exec();
  }

  /**
   * Найти продукт по серийному номеру
   * @param {string} serialNumber
   * @returns {Promise<Object|null>}
   */
  async findBySerialNumber(serialNumber) {
    return ProductModel.findOne({ serialNumber }).lean().exec();
  }

  /**
   * Найти все продукты коллекции
   * @param {string} collectionId
   * @param {Object} options
   * @param {number} options.limit
   * @param {number} options.offset
   * @returns {Promise<Object[]>}
   */
  async findByCollectionId(collectionId, options = {}) {
    const { limit = 50, offset = 0 } = options;

    return ProductModel.find({ collectionId })
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
  }

  /**
   * Найти несколько продуктов по списку business-id
   * @param {string[]} ids
   * @returns {Promise<Object[]>}
   */
  async findManyByIds(ids) {
    if (!ids || ids.length === 0) return [];
    return ProductModel.find({ id: { $in: ids } })
      .lean()
      .exec();
  }

  /**
   * Обновить продукт по business-id
   * @param {string} id
   * @param {Object} updates
   * @returns {Promise<Object|null>} обновлённый продукт
   */
  async updateById(id, updates) {
    return ProductModel.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    )
      .lean()
      .exec();
  }

  /**
   * Обновить статус продукта (manufactured, in_stock, sold, ...)
   * @param {string} id
   * @param {string} status
   * @returns {Promise<Object|null>}
   */
  async updateStatus(id, status) {
    return ProductModel.findOneAndUpdate(
      { id },
      { $set: { status } },
      { new: true }
    )
      .lean()
      .exec();
  }

  /**
   * Удалить продукт по business-id
   * (на всякий случай, для админки/тестов)
   * @param {string} id
   * @returns {Promise<boolean>} true если был удалён
   */
  async deleteById(id) {
    const res = await ProductModel.deleteOne({ id }).exec();
    return res.deletedCount > 0;
  }
}

module.exports = new ProductRepository();
