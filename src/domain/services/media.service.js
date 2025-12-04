// src/domain/services/media.service.js

const fs = require("fs");
const path = require("path");

const mediaRepository = require("../../infra/db/repositories/media.repository");

/**
 * MediaService
 * Бизнес-логика работы с медиа:
 * - выбор директории
 * - генерация имени файла
 * - создание записи в БД
 * - удаление файла
 * - назначение primary image
 */
class MediaService {
  /**
   * Определить папку хранения по типу владельца
   */
  getUploadDir(ownerType, ownerId) {
    switch (ownerType) {
      case "PRODUCT":
        return path.join("uploads", "products", ownerId);
      case "COLLECTION":
        return path.join("uploads", "collections", ownerId);
      case "CAMPAIGN":
        return path.join("uploads", "campaigns", ownerId);
      default:
        throw new Error(`Неизвестный ownerType: ${ownerType}`);
    }
  }

  /**
   * Создать директорию, если её нет
   */
  ensureDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Загрузка медиа-файла
   * @param {Object} file — объект от multer
   * @param {string} ownerType — PRODUCT | COLLECTION | CAMPAIGN
   * @param {string} ownerId
   * @param {Object} metadata
   */
  async uploadMedia(file, ownerType, ownerId, metadata = {}) {
    if (!file) throw new Error("Файл не был загружен");

    const uploadDir = this.getUploadDir(ownerType, ownerId);
    this.ensureDirectory(uploadDir);

    // Генерация имени файла
    const ext = path.extname(file.originalname) || "";
    const filename = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}${ext}`;
    const filepath = path.join(uploadDir, filename);

    // Сохраняем на диск
    fs.writeFileSync(filepath, file.buffer);

    // Определяем тип медиа
    const kind = file.mimetype.startsWith("video") ? "VIDEO" : "IMAGE";

    // Создаем запись в БД
    const media = await mediaRepository.create({
      id: `media_${Date.now()}`,
      ownerType,
      ownerId,
      kind,
      url: `/${filepath.replace(/\\/g, "/")}`,
      altText: metadata.altText || null,
      metadata: metadata.metadata || {},
      isPrimary: metadata.isPrimary || false,
      position: metadata.position || 0,
    });

    return media;
  }

  /**
   * Получить галерею сущности
   */
  async getGallery(ownerType, ownerId) {
    return mediaRepository.findByOwner(ownerType, ownerId);
  }

  /**
   * Назначить media как primary
   */
  async setPrimaryMedia(ownerType, ownerId, mediaId) {
    return mediaRepository.setPrimary(mediaId, ownerType, ownerId);
  }

  /**
   * Удалить медиа (файл + документ)
   */
  async deleteMedia(mediaId) {
    const media = await mediaRepository.findById(mediaId);
    if (!media) {
      throw new Error(`Медиа '${mediaId}' не найдено`);
    }

    // Удаляем файл с диска
    const localPath = path.join(process.cwd(), media.url);
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    // Удаляем запись из БД
    await mediaRepository.deleteById(mediaId);
    return true;
  }

  /**
   * Обновить медиа-объект (только запись, без изменения файла)
   */
  async updateMedia(mediaId, updates) {
    const updated = await mediaRepository.updateById(mediaId, updates);
    if (!updated) {
      throw new Error(`Медиа '${mediaId}' не найдено`);
    }
    return updated;
  }
}

module.exports = new MediaService();
