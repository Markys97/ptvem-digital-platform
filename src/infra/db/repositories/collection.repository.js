// src/infra/db/repositories/collection.repository.js
const CollectionModel = require("../models/collection.model");

/**
 * CollectionRepository
 * Отвечает за работу с коллекциями в MongoDB/Mongoose.
 * Содержит только прямые операции с БД — НИКАКОЙ бизнес-логики.
 */
class CollectionRepository {
  /**
   * Создать новую коллекцию
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const doc = await CollectionModel.create(data);
    return doc.toObject();
  }

  /**
   * Найти коллекцию по бизнес-id (col_501)
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return CollectionModel.findOne({ id }).lean().exec();
  }

  /**
   * Найти коллекцию по Mongo _id (если нужно)
   */
  async findByMongoId(mongoId) {
    return CollectionModel.findById(mongoId).lean().exec();
  }

  /**
   * Найти коллекцию по QR-коду
   * (ключевая функция для всего ProductService)
   * @param {string} qrCode
   * @returns {Promise<Object|null>}
   */
  async findByQrCode(qrCode) {
    return CollectionModel.findOne({ qrCode }).lean().exec();
  }

  /**
   * Получить список всех коллекций (для админки)
   * @param {Object} options
   * @param {number} options.limit
   * @param {number} options.offset
   */
  async findAll(options = {}) {
    const { limit = 50, offset = 0 } = options;

    return CollectionModel.find().skip(offset).limit(limit).lean().exec();
  }

  /**
   * Найти несколько коллекций по списку business-id
   */
  async findManyByIds(ids) {
    if (!ids || ids.length === 0) return [];
    return CollectionModel.find({ id: { $in: ids } })
      .lean()
      .exec();
  }

  /**
   * Обновить коллекцию по id
   * (например, изменить heroMediaId, promoMediaIds, name, description…)
   */
  async updateById(id, updates) {
    return CollectionModel.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    )
      .lean()
      .exec();
  }

  /**
   * Обновить hero (главный медиа-файл коллекции)
   */
  async updateHeroMedia(id, mediaId) {
    return CollectionModel.findOneAndUpdate(
      { id },
      { $set: { heroMediaId: mediaId } },
      { new: true }
    )
      .lean()
      .exec();
  }

  /**
   * Удалить коллекцию
   * Используется редко — для тестирования / админ панели
   */
  async deleteById(id) {
    const res = await CollectionModel.deleteOne({ id }).exec();
    return res.deletedCount > 0;
  }
}

module.exports = new CollectionRepository();
