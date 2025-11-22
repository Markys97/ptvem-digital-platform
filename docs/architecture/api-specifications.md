# 📋 **CODE COMPLET POUR API-SPECIFICATIONS.md**

````markdown
# 🔗 Спецификации API PTVEM

## Обзор

Полная документация REST API для платформы PTVEM.

---

## 📦 API Сервиса Продуктов

### Базовый URL: `https://api.ptvem.com/products`

#### GET /products/{qrCode}

**Описание:** Получить информацию о продукте по QR-коду

**Параметры:**

- `qrCode` (path) - Уникальный QR-код продукта

**Ответ:**

```json
{
  "id": "prod_123",
  "name": "Футболка PTVEM Limited Edition",
  "description": "Стритвир футболка лимитированная серия",
  "manufactureDate": "2024-01-15",
  "designStory": "Вдохновлено уличным искусством Парижа...",
  "currentOwner": {
    "userId": "user_456",
    "username": "fashion_lover",
    "consent": true
  },
  "qrCode": "PTVEM-ABC123-XYZ789"
}
```
````

#### POST /products

**Описание:** Создать новый продукт

**Запрос:**

```json
{
  "name": "Новая футболка PTVEM",
  "description": "Описание продукта",
  "designStory": "История дизайна",
  "materials": ["хлопок", "полиэстер"],
  "collection": "Стритвир 2024"
}
```

**Ответ:**

```json
{
  "id": "prod_123",
  "qrCode": "PTVEM-ABC123-XYZ789",
  "createdAt": "2024-01-20T10:30:00Z"
}
```

#### GET /products/{id}/details

**Описание:** Получить детальную информацию о продукте

**Ответ:**

```json
{
  "id": "prod_123",
  "name": "Футболка PTVEM Limited Edition",
  "fullDescription": "Детальное описание продукта...",
  "specifications": {
    "material": "100% хлопок",
    "size": "L",
    "color": "Черный",
    "manufacturer": "PTVEM Studios"
  }
}
```

---

## 👤 API Сервиса Владения

### Базовый URL: `https://api.ptvem.com/ownership`

#### POST /ownership/transfer

**Описание:** Передать право собственности на продукт

**Запрос:**

```json
{
  "productId": "prod_123",
  "fromUserId": "user_456",
  "toUserId": "user_789",
  "transferType": "sale",
  "price": 45.0
}
```

#### GET /ownership/{productId}/history

**Описание:** Получить полную историю владельцев

**Ответ:**

```json
{
  "productId": "prod_123",
  "ownershipHistory": [
    {
      "owner": {
        "userId": "user_456",
        "username": "original_owner"
      },
      "startDate": "2024-01-20",
      "endDate": "2024-03-15",
      "story": "Первый владелец, носил во время запуска"
    },
    {
      "owner": {
        "userId": "user_789",
        "username": "current_owner"
      },
      "startDate": "2024-03-15",
      "endDate": null,
      "story": "Куплен для моей коллекции"
    }
  ]
}
```

#### PUT /ownership/{productId}/consent

**Описание:** Управление согласием на отображение данных

**Запрос:**

```json
{
  "showProfile": true,
  "showStories": true,
  "showContactInfo": false
}
```

#### GET /ownership/user/{userId}

**Описание:** Получить продукты, принадлежащие пользователю

**Ответ:**

```json
{
  "userId": "user_456",
  "ownedProducts": [
    {
      "productId": "prod_123",
      "acquisitionDate": "2024-01-20",
      "isCurrentlyOwned": true
    }
  ]
}
```

---

## 📖 API Сервиса Историй

### Базовый URL: `https://api.ptvem.com/stories`

#### POST /stories

**Описание:** Добавить историю к продукту

**Запрос:**

```json
{
  "productId": "prod_123",
  "userId": "user_456",
  "title": "Мой первый концерт в этой футболке",
  "content": "Я носил эту футболку на моем первом концерте...",
  "photos": ["photo1.jpg", "photo2.jpg"],
  "isPublic": true
}
```

#### GET /stories/{productId}

**Описание:** Получить истории продукта

**Ответ:**

```json
{
  "productId": "prod_123",
  "stories": [
    {
      "id": "story_456",
      "title": "Мой первый концерт",
      "content": "Текст истории...",
      "author": "user_456",
      "createdAt": "2024-01-25T14:30:00Z",
      "photos": ["photo1.jpg"]
    }
  ]
}
```

#### PUT /stories/{storyId}

**Описание:** Обновить историю

#### DELETE /stories/{storyId}

**Описание:** Удалить историю

---

## 💰 API Сервиса Перепродажи

### Базовый URL: `https://api.ptvem.com/resale`

#### POST /resale/listings

**Описание:** Разместить продукт для перепродажи

**Запрос:**

```json
{
  "productId": "prod_123",
  "sellerId": "user_456",
  "price": 50.0,
  "condition": "excellent",
  "description": "Футболка в отличном состоянии..."
}
```

#### GET /resale/listings

**Описание:** Получить список продуктов для перепродажи

**Ответ:**

```json
{
  "listings": [
    {
      "id": "listing_789",
      "product": {
        "id": "prod_123",
        "name": "Футболка PTVEM Limited Edition"
      },
      "seller": {
        "userId": "user_456",
        "username": "fashion_lover"
      },
      "price": 50.0,
      "condition": "excellent"
    }
  ]
}
```

#### POST /resale/transactions

**Описание:** Начать транзакцию перепродажи

**Запрос:**

```json
{
  "listingId": "listing_789",
  "buyerId": "user_999",
  "offerPrice": 45.0
}
```

---

## 🔐 API Аутентификации

### Базовый URL: `https://api.ptvem.com/auth`

#### POST /auth/register

**Описание:** Создать новую учетную запись пользователя

**Запрос:**

```json
{
  "email": "user@example.com",
  "username": "fashion_lover",
  "password": "secure_password",
  "profile": {
    "firstName": "Иван",
    "lastName": "Петров",
    "preferences": {
      "notifications": true,
      "publicProfile": true
    }
  }
}
```

#### POST /auth/login

**Описание:** Аутентифицировать пользователя

**Запрос:**

```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Ответ:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "username": "fashion_lover"
  }
}
```

#### POST /auth/logout

**Описание:** Выйти из системы

#### GET /auth/verify

**Описание:** Проверить токен

---

## 📧 API Сервиса Уведомлений

### Базовый URL: `https://api.ptvem.com/notifications`

#### POST /notifications/email

**Описание:** Отправить email уведомление

**Запрос:**

```json
{
  "to": "user@example.com",
  "template": "welcome",
  "data": {
    "username": "fashion_lover",
    "productName": "Футболка PTVEM"
  }
}
```

---

## 💳 API Сервиса Платежей

### Базовый URL: `https://api.ptvem.com/payments`

#### POST /payments/process

**Описание:** Обработать платеж

**Запрос:**

```json
{
  "amount": 45.0,
  "currency": "EUR",
  "paymentMethod": "card",
  "cardToken": "tok_123456",
  "description": "Покупка PTVEM футболки"
}
```

---

## 🖼️ API Сервиса Медиа

### Базовый URL: `https://api.ptvem.com/media`

#### POST /media/upload

**Описание:** Загрузить медиа файл

#### GET /media/{fileId}

**Описание:** Получить медиа файл

---

## 📊 API Аналитики

### Базовый URL: `https://api.ptvem.com/analytics`

#### POST /analytics/scans

**Описание:** Зарегистрировать сканирование QR-кода

**Запрос:**

```json
{
  "productId": "prod_123",
  "qrCode": "PTVEM-ABC123-XYZ789",
  "scannerId": "user_456",
  "location": "Париж, Франция",
  "timestamp": "2024-01-20T14:30:00Z"
}
```

#### GET /analytics/dashboard

**Описание:** Получить данные для аналитической панели

**Ответ:**

```json
{
  "totalScans": 1500,
  "activeUsers": 450,
  "resaleTransactions": 89,
  "popularProducts": [
    {
      "productId": "prod_123",
      "scanCount": 234
    }
  ]
}
```

---

## 🛡️ Безопасность и Ограничения

- **Аутентификация:** JWT Bearer Token
- **Ограничение запросов:** 1000 запросов/час на IP
- **CORS:** Разрешено для доменов ptvem.com
- **Валидация данных:** Валидация JSON Schema на всех endpoint'ах
- **Шифрование:** HTTPS для всех запросов

## 📝 Коды Ошибок

| Код | Сообщение                 | Описание                 |
| --- | ------------------------- | ------------------------ |
| 400 | Неверный Запрос           | Неверные входные данные  |
| 401 | Неавторизован             | Требуется аутентификация |
| 403 | Запрещено                 | Недостаточно прав        |
| 404 | Не Найдено                | Ресурс не найден         |
| 429 | Слишком Много Запросов    | Превышен лимит запросов  |
| 500 | Внутренняя Ошибка Сервера | Ошибка сервера           |

## 🔄 Версионирование API

Текущая версия: **v1**  
Все endpoint'ы префиксируются: `/api/v1/`

## 📋 Пример использования

```javascript
// Пример запроса на сканирование QR-кода
const response = await fetch(
  "https://api.ptvem.com/api/v1/products/PTVEM-ABC123-XYZ789",
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }
);

const productData = await response.json();
console.log(productData);
```

````

**INSTRUCTIONS POUR VS CODE :**
1. Ouvrez VS Code
2. Ouvrez le fichier `docs/architecture/api-specifications.md`
3. Sélectionnez TOUT (`Ctrl+A`)
4. Supprimez
5. Copiez-collez CE TEXTE COMPLET
6. Sauvegardez (`Ctrl+S`)
7. Faites le commit Git

**COMMANDES GIT :**
```bash
git add docs/architecture/api-specifications.md
git commit -m "📚 Добавление полных спецификаций API"
git push origin main
````
