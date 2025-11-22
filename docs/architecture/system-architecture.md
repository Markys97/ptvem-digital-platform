# 🏗️ Architecture Système PTVEM

## Vue d'Ensemble
PTVEM utilise une architecture microservices modulaire avec 9 services spécialisés, permettant une scalabilité indépendante et une maintenance simplifiée.

## Services et Responsabilités

### 📦 Product Service
**Responsabilités :**
- Gestion du catalogue produits
- Génération et validation des QR codes
- Authenticité des produits
- Gestion des collections et designs

**APIs Principales :**
- `POST /api/products` - Créer un produit
- `GET /api/products/{qrCode}` - Obtenir un produit par QR code
- `POST /api/products/{id}/qr` - Régénérer un QR code
- `GET /api/products/{id}/details` - Détails complets du produit

### 👤 Ownership Service
**Responsabilités :**
- Suivi de la chaîne de propriété
- Transfert de propriété
- Historique des propriétaires
- Gestion des consentements de visibilité

**APIs Principales :**
- `POST /api/ownership/transfer` - Transférer la propriété
- `GET /api/ownership/{productId}/history` - Obtenir l'historique
- `PUT /api/ownership/{productId}/consent` - Gérer le consentement
- `GET /api/ownership/user/{userId}` - Produits possédés par un utilisateur

### 📖 Story Service
**Responsabilités :**
- Gestion des histoires utilisateur
- Modération du contenu
- Timeline des produits
- Photos et récits associés

**APIs Principales :**
- `POST /api/stories` - Ajouter une histoire
- `GET /api/stories/{productId}` - Obtenir les histoires d'un produit
- `PUT /api/stories/{storyId}` - Modifier une histoire
- `DELETE /api/stories/{storyId}` - Supprimer une histoire

### 💰 Resale Service
**Responsabilités :**
- Marketplace de revente
- Transactions entre utilisateurs
- Calcul des prix de revente
- Gestion des listings

**APIs Principales :**
- `POST /api/resale/listings` - Lister un produit en revente
- `GET /api/resale/listings` - Voir les produits en revente
- `POST /api/resale/transactions` - Initier une transaction
- `PUT /api/resale/listings/{listingId}` - Modifier un listing

### 🔐 Auth Service
**Responsabilités :**
- Authentification des utilisateurs
- Gestion des sessions
- Autorisations et rôles
- Sécurité des APIs

**APIs Principales :**
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `POST /api/auth/logout` - Se déconnecter
- `GET /api/auth/verify` - Vérifier un token

## Architecture Technique

### Stack Technologique
- **Backend** : Node.js, TypeScript, Express
- **Base de données** : MongoDB (données principales), Redis (cache)
- **API** : RESTful avec documentation OpenAPI
- **Authentification** : JWT Tokens
- **Stockage** : AWS S3 pour les médias

### Communication entre Services
- Synchronous : REST APIs pour les opérations critiques
- Asynchronous : Message Queue pour les notifications
- Event-Driven : Événements pour les mises à jour en temps réel

## Sécurité

- Validation des données d'entrée
- Rate limiting sur les APIs
- Chiffrement des données sensibles
- Audit des actions utilisateur
