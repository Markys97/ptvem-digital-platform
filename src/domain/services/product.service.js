// src/domain/services/product.service.js

const productRepository = require("../../infra/db/repositories/product.repository");
const collectionRepository = require("../../infra/db/repositories/collection.repository");
const categoryRepository = require("../../infra/db/repositories/category.repository");
const mediaRepository = require("../../infra/db/repositories/media.repository");

/**
 * ProductService
 * Здесь находится ВСЯ бизнес-логика создания и получения продуктов.
 */
class ProductService {
  /**
   * Создать новый продукт
   * @param {Object} payload — данные из контроллера
   */
  async createProduct(payload) {
    const {
      collectionId,
      categoryId,
      serialNumber,
      name,
      description,
      materials,
      specifications,
      manufactureDate,
    } = payload;

    // 1️⃣ Проверяем существование категории
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error(`Категория '${categoryId}' не найдена`);
    }

    // 2️⃣ Проверяем существование коллекции
    const collection = await collectionRepository.findById(collectionId);
    if (!collection) {
      throw new Error(`Коллекция '${collectionId}' не найдена`);
    }

    // 3️⃣ Проверяем уникальность серийного номера
    const existingProduct = await productRepository.findBySerialNumber(
      serialNumber
    );
    if (existingProduct) {
      throw new Error(
        `Продукт с серийным номером ${serialNumber} уже существует`
      );
    }

    // 4️⃣ Строим объект продукта
    const data = {
      id: `prod_${Date.now()}`, // может быть заменено генератором ID
      collectionId,
      categoryId,
      serialNumber,
      name,
      description,
      materials,
      specifications,
      manufactureDate,
      status: "in_stock",
      qrCode: collection.qrCode, // важный момент: продукт наследует QR-код коллекции
    };

    // 5️⃣ Сохраняем продукт
    const created = await productRepository.create(data);
    return created;
  }

  /**
   * Получить продукт по его ID (business-id)
   */
  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error(`Продукт '${id}' не найден`);
    }

    // получаем primary медиа
    const primaryMedia = await mediaRepository.findPrimaryMedia("PRODUCT", id);
    if (primaryMedia) product.primaryMedia = primaryMedia;

    return product;
  }

  /**
   * Получить продукт по QR-коду коллекции
   * Используется в API: GET /products/qr/{qrCode}
   */
  async getProductsByQrCode(qrCode) {
    // 1️⃣ Находим коллекцию
    const collection = await collectionRepository.findByQrCode(qrCode);
    if (!collection) {
      throw new Error(`Коллекция с QR-кодом '${qrCode}' не найдена`);
    }

    // 2️⃣ Находим продукты коллекции
    const products = await productRepository.findByCollectionId(collection.id);

    // 3️⃣ Добавляем primaryMedia каждому продукту
    for (let product of products) {
      const pm = await mediaRepository.findPrimaryMedia("PRODUCT", product.id);
      if (pm) product.primaryMedia = pm;
    }

    // 4️⃣ Добавляем heroMedia к коллекции
    const hero = collection.heroMediaId
      ? await mediaRepository.findById(collection.heroMediaId)
      : null;

    return {
      collection,
      heroMedia: hero,
      products,
    };
  }

  /**
   * Обновить статус продукта
   */
  async updateProductStatus(id, status) {
    const updated = await productRepository.updateStatus(id, status);
    if (!updated) {
      throw new Error(`Продукт '${id}' не найден`);
    }
    return updated;
  }

  /**
   * Установить главное изображение продукта
   */
  async setPrimaryMedia(productId, mediaId) {
    return mediaRepository.setPrimary(mediaId, "PRODUCT", productId);
  }
}

module.exports = new ProductService();
