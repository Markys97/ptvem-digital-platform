// src/interfaces/http/controllers/product.controller.js

const productService = require("../../domain/services/product.service");
// const { localizeDocument } = require('../../../domain/utils/i18n'); // будет использовано позже для мультиязычности

/**
 * Контроллер для работы с продуктами.
 * Здесь:
 * - принимаем HTTP-запрос
 * - вызываем ProductService
 * - формируем HTTP-ответ
 */

function mapErrorToStatus(err) {
  // Простая маппинг-функция для статусов ошибок
  const msg = err.message || "";

  if (msg.includes("не найден")) {
    return 404;
  }

  if (msg.includes("уже существует")) {
    return 409;
  }

  return 400;
}

class ProductController {
  /**
   * POST /api/products
   * Создание нового продукта
   */
  async createProduct(req, res) {
    try {
      const payload = req.body;

      // Простейшая валидация (MVP)
      if (
        !payload.collectionId ||
        !payload.categoryId ||
        !payload.serialNumber
      ) {
        return res.status(400).json({
          error: "collectionId, categoryId и serialNumber обязательны",
        });
      }

      const created = await productService.createProduct(payload);

      // Позже можно добавить локализацию:
      // const localized = localizeDocument(created, req.lang);

      return res.status(201).json(created);
    } catch (err) {
      console.error("createProduct error:", err);
      const status = mapErrorToStatus(err) || 500;

      return res.status(status).json({
        error: err.message || "Внутренняя ошибка сервера",
      });
    }
  }

  /**
   * GET /api/products/:id/details
   * Получить детальную информацию о продукте
   */
  async getProductDetails(req, res) {
    try {
      const { id } = req.params;

      const product = await productService.getProductById(id);

      // Позже:
      // const localized = localizeDocument(product, req.lang);

      return res.json(product);
    } catch (err) {
      console.error("getProductDetails error:", err);
      const status = mapErrorToStatus(err) || 500;

      return res.status(status).json({
        error: err.message || "Внутренняя ошибка сервера",
      });
    }
  }

  /**
   * GET /api/products/qr/:qrCode
   * Получить коллекцию и связанные продукты по QR-коду коллекции
   */
  async getByQrCode(req, res) {
    try {
      const { qrCode } = req.params;

      const result = await productService.getProductsByQrCode(qrCode);

      // Позже:
      // const localized = localizeDocument(result, req.lang);

      return res.json(result);
    } catch (err) {
      console.error("getByQrCode error:", err);
      const status = mapErrorToStatus(err) || 500;

      return res.status(status).json({
        error: err.message || "Внутренняя ошибка сервера",
      });
    }
  }

  /**
   * PATCH /api/products/:id/status
   * Обновить статус продукта (manufactured, in_stock, sold, ...)
   * (не обязательно для MVP, но полезно)
   */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Поле status обязательно" });
      }

      const updated = await productService.updateProductStatus(id, status);

      return res.json(updated);
    } catch (err) {
      console.error("updateStatus error:", err);
      const status = mapErrorToStatus(err) || 500;

      return res.status(status).json({
        error: err.message || "Внутренняя ошибка сервера",
      });
    }
  }
}

module.exports = new ProductController();
