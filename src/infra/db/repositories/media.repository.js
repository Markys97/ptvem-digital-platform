// src/infra/db/repositories/media.repository.js
const MediaAssetModel = require("../models/mediaAsset.model");

/**
 * MediaRepository
 * ПРИНЦИПЫ:
 * - Только CRUD / запросы к MongoDB
 * - Никакой бизнес-логики
 * - Используем .lean() для скорости
 */
class MediaRepository {
  /**
   * Создать новый медиа-объект
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const doc = await MediaAssetModel.create(data);
    return doc.toObject();
  }

  /**
   * Найти медиа по id
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return MediaAssetModel.findOne({ id }).lean().exec();
  }

  /**
   * Получить все медиа, принадлежащие сущности
   * @param {string} ownerType - PRODUCT | COLLECTION | CAMPAIGN
   * @param {string} ownerId
   * @returns {Promise<Object[]>}
   */
  async findByOwner(ownerType, ownerId) {
    return MediaAssetModel.find({ ownerType, ownerId }).lean().exec();
  }

  /**
   * Найти главное (primary) медиа сущности
   */
  async findPrimaryMedia(ownerType, ownerId) {
    return MediaAssetModel.findOne({
      ownerType,
      ownerId,
      isPrimary: true,
    })
      .lean()
      .exec();
  }

  /**
   * Сделать изображение основным (primary)
   * @param {string} mediaId
   * @returns {Promise<Object|null>}
   */
  async setPrimary(mediaId, ownerType, ownerId) {
    // Снимаем флаг primary со всех медиа
    await MediaAssetModel.updateMany(
      { ownerType, ownerId },
      { $set: { isPrimary: false } }
    );

    // Устанавливаем primary на указанное медиа
    return MediaAssetModel.findOneAndUpdate(
      { id: mediaId },
      { $set: { isPrimary: true } },
      { new: true }
    )
      .lean()
      .exec();
  }

  /**
   * Удалить медиа (логически или физически)
   * На уровне репозитория — только удаление документа
   */
  async deleteById(id) {
    const res = await MediaAssetModel.deleteOne({ id }).exec();
    return res.deletedCount > 0;
  }

  /**
   * Обновить медиа (например altText, metadata)
   */
  async updateById(id, updates) {
    return MediaAssetModel.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    )
      .lean()
      .exec();
  }
}

module.exports = new MediaRepository();
