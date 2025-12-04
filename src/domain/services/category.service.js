// src/domain/services/category.service.js

const categoryRepository = require("../../infra/db/repositories/category.repository");

/**
 * CategoryService
 * Бизнес-логика работы с категориями продуктов:
 * - создание / обновление / удаление
 * - выдача списка категорий
 * - валидация существования категории
 */
class CategoryService {
  /**
   * Создать новую категорию
   * payload = {
   *   id: "cat_tshirt",
   *   code: "T_SHIRT",
   *   name: { fr, en, ru },
   *   description: { fr, en, ru },
   *   allowedSizes: ["XS","S","M","L","XL"],
   *   metadata: {...}
   * }
   */
  async createCategory(payload) {
    const { id, code } = payload;

    // 1️⃣ Проверка уникальности id
    const existingById = await categoryRepository.findById(id);
    if (existingById) {
      throw new Error(`Категория с id '${id}' уже существует`);
    }

    // 2️⃣ Проверка уникальности code
    const existingByCode = await categoryRepository.findByCode(code);
    if (existingByCode) {
      throw new Error(`Категория с code '${code}' уже существует`);
    }

    // 3️⃣ Создание категории
    const created = await categoryRepository.create(payload);
    return created;
  }

  /**
   * Получить категорию по id
   */
  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error(`Категория '${id}' не найдена`);
    }
    return category;
  }

  /**
   * Получить категорию по code
   */
  async getCategoryByCode(code) {
    const category = await categoryRepository.findByCode(code);
    if (!category) {
      throw new Error(`Категория с кодом '${code}' не найдена`);
    }
    return category;
  }

  /**
   * Получить все категории (для селекторов, админки и т.д.)
   */
  async listCategories(options = {}) {
    return categoryRepository.findAll(options);
  }

  /**
   * Обновить категорию
   */
  async updateCategory(id, updates) {
    const updated = await categoryRepository.updateById(id, updates);
    if (!updated) {
      throw new Error(`Категория '${id}' не найдена`);
    }
    return updated;
  }

  /**
   * Удалить категорию (обычно только для админки)
   */
  async deleteCategory(id) {
    const deleted = await categoryRepository.deleteById(id);
    if (!deleted) {
      throw new Error(`Категория '${id}' не найдена`);
    }
    return true;
  }

  /**
   * Проверка, что категория существует (утилита для других сервисов)
   * Возвращает категорию или кидает ошибку.
   */
  async ensureCategoryExists(categoryId) {
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      throw new Error(`Категория '${categoryId}' не найдена`);
    }
    return category;
  }
}

module.exports = new CategoryService();
