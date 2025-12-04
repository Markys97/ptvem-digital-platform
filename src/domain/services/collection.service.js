// src/domain/services/collection.service.js

const collectionRepository = require("../../infra/db/repositories/collection.repository");
const mediaRepository = require("../../infra/db/repositories/media.repository");
const productRepository = require("../../infra/db/repositories/product.repository");

class CollectionService {
  /**
   * Создать новую коллекцию
   * payload = {
   *   id, code, name, description, designStory, qrCode, heroMediaId
   * }
   */
  async createCollection(payload) {
    const { id, code, name, description, designStory, qrCode, heroMediaId } =
      payload;

    // 1️⃣ Проверяем уникальность business-id коллекции
    const existing = await collectionRepository.findById(id);
    if (existing) {
      throw new Error(`Коллекция '${id}' уже существует`);
    }

    // 2️⃣ Проверяем уникальность QR-кода
    const qrExists = await collectionRepository.findByQrCode(qrCode);
    if (qrExists) {
      throw new Error(`QR-код '${qrCode}' уже принадлежит другой коллекции`);
    }

    // 3️⃣ Собираем объект коллекции
    const data = {
      id,
      code,
      name,
      description,
      designStory,
      qrCode,
      heroMediaId: heroMediaId || null,
    };

    // 4️⃣ Сохраняем коллекцию
    const created = await collectionRepository.create(data);
    return created;
  }

  /**
   * Получить коллекцию по business-id
   */
  async getCollectionById(id) {
    const collection = await collectionRepository.findById(id);
    if (!collection) {
      throw new Error(`Коллекция '${id}' не найдена`);
    }

    // Получаем hero-медиа
    let heroMedia = null;
    if (collection.heroMediaId) {
      heroMedia = await mediaRepository.findById(collection.heroMediaId);
    }

    // Получить список продуктов коллекции
    const products = await productRepository.findByCollectionId(collection.id);

    return {
      collection,
      heroMedia,
      products,
    };
  }

  /**
   * Получить коллекцию по QR-коду
   */
  async getCollectionByQrCode(qrCode) {
    const collection = await collectionRepository.findByQrCode(qrCode);
    if (!collection) {
      throw new Error(`Коллекция с QR-кодом '${qrCode}' не найдена`);
    }

    // Добавляем hero-медиа
    let heroMedia = null;
    if (collection.heroMediaId) {
      heroMedia = await mediaRepository.findById(collection.heroMediaId);
    }

    return {
      collection,
      heroMedia,
    };
  }

  /**
   * Назначить новое главное изображение коллекции
   */
  async setHeroMedia(collectionId, mediaId) {
    return collectionRepository.updateHeroMedia(collectionId, mediaId);
  }

  /**
   * Обновить коллекцию (тексты, мультиязычность, промо-материалы и т.д.)
   */
  async updateCollection(id, updates) {
    const updated = await collectionRepository.updateById(id, updates);
    if (!updated) {
      throw new Error(`Коллекция '${id}' не найдена`);
    }
    return updated;
  }

  /**
   * Удалить коллекцию (обычно только для админки или тестов)
   */
  async deleteCollection(id) {
    const deleted = await collectionRepository.deleteById(id);
    if (!deleted) {
      throw new Error(`Коллекция '${id}' не найдена`);
    }
    return true;
  }
}

module.exports = new CollectionService();
