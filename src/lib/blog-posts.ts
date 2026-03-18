import type { BlogPost } from './blog-generator';

export const blogPostsEn: BlogPost[] = [
  {
    slug: 'building-scalable-saas-spring-boot-react',
    title: 'Building Scalable SaaS with Spring Boot & React',
    excerpt:
      'A comprehensive guide to architecting cloud-native SaaS applications using Spring Boot for the backend and React for the frontend, with best practices for scalability and performance.',
    content: `## Introduction

Building a scalable SaaS application requires careful architectural decisions. In this guide, I'll share insights from my experience building enterprise-grade applications using Spring Boot and React.

## Architecture Overview

A well-structured SaaS application follows a modular architecture:

\`\`\`
Frontend: React + TypeScript + Tailwind CSS
Backend: Spring Boot + Java 17
Database: PostgreSQL
Cache: Redis
Cloud: AWS/GCP
CI/CD: GitHub Actions + Docker
\`\`\`

## Key Principles for Scalability

### 1. Microservices Architecture

Split your application into domain-focused services:

- **User Service**: Authentication & Authorization
- **Billing Service**: Payments & Subscriptions
- **Core Service**: Main business logic

### 2. Database Design

Use PostgreSQL for relational data with proper indexing:

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
\`\`\`

### 3. API Design

Design RESTful APIs following best practices:

\`\`\`java
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @GetMapping
    public ResponseEntity<Page<OrderDTO>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(orderService.getOrders(page, size));
    }
}
\`\`\`

## Performance Optimization

### Frontend Optimizations

- Implement code splitting with React.lazy()
- Use memoization with useMemo and useCallback
- Optimize images with next/image

### Backend Optimizations

- Enable response caching with Redis
- Use connection pooling for database
- Implement async processing for heavy tasks

## Security Best Practices

1. **OAuth2 + JWT** for authentication
2. **Rate limiting** to prevent abuse
3. **Input validation** with Bean Validation
4. **HTTPS** everywhere

## Conclusion

Building scalable SaaS requires a holistic approach. Focus on clean architecture, proper testing, and continuous monitoring.

---

## Got Questions?

I'm always happy to help! Here's how you can reach me:

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Connect with me](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707

Ready to start your next project? Let's chat!`,
    author: 'Mouil Prosper',
    authorTitle: 'Full-Stack Developer',
    date: '2026-03-15',
    category: 'Engineering',
    tags: ['Spring Boot', 'React', 'SaaS', 'Architecture', 'Java'],
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'cicd-pipeline-docker-github-actions',
    title: 'CI/CD Pipeline Setup with Docker & GitHub Actions',
    excerpt:
      'Step-by-step guide to building automated deployment pipelines that reduce deployment time by 35% using Docker, GitHub Actions, and Coolify.',
    content: `## Introduction

Continuous Integration and Continuous Deployment (CI/CD) are essential for modern software development. In this tutorial, I'll show you how to set up a robust CI/CD pipeline.

## Why CI/CD Matters

- **Faster releases**: From weeks to hours
- **Fewer bugs**: Automated testing catches issues early
- **Consistency**: Same process every time
- **Rollback**: Easy reversion if issues arise

## Docker Setup

First, let's containerize our application:

\`\`\`dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## GitHub Actions Workflow

Create \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
      - name: Run tests
        run: ./mvnw test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t myapp:\${{ github.sha }} .

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: \${{ secrets.SERVER_HOST }}
          script: |
            docker pull myapp:\${{ github.sha }}
            docker stop myapp || true
            docker run -d --name myapp -p 8080:8080 myapp:\${{ github.sha }}
\`\`\`

## Coolify Integration

For self-hosted deployments, Coolify provides an excellent interface:

1. Connect your GitHub repository
2. Configure build settings
3. Set up environment variables
4. Enable auto-deploy on push

## Results

After implementing this pipeline:
- **Deployment time**: Reduced from 45 min to 15 min (67% faster)
- **Failed deployments**: Reduced by 80%
- **Rollback time**: Less than 5 minutes

## Conclusion

CI/CD is not optional anymore. Start small, iterate, and continuously improve your pipeline.

---

## Let's Connect!

Need help setting up your CI/CD pipeline?

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Message me](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'Full-Stack Developer',
    date: '2026-02-28',
    category: 'DevOps',
    tags: ['Docker', 'GitHub Actions', 'CI/CD', 'DevOps', 'Automation'],
    readTime: '10 min read',
    featured: false,
  },
  {
    slug: 'ai-powered-fraud-detection-payment-gateways',
    title: 'Implementing AI-Powered Fraud Detection in Payment Gateways',
    excerpt:
      'How I built an ML-based fraud detection system that reduced fraudulent transactions by 60% while maintaining a seamless user experience.',
    content: `## Introduction

Payment fraud is a growing concern for online businesses. In this article, I'll share how I implemented an AI-powered fraud detection system that significantly reduced fraudulent transactions.

## The Problem

Traditional rule-based systems:
- High false positive rates (legitimate transactions blocked)
- Constant manual rule updates needed
- Can't detect new fraud patterns

## Solution: Machine Learning Approach

### Feature Engineering

Key features for fraud detection:

\`\`\`python
features = [
    'transaction_amount',
    'user_age_days',
    'transaction_frequency_24h',
    'ip_country_match',
    'device_fingerprint',
    'time_of_day',
    'historical_fraud_rate',
    'velocity_check'
]
\`\`\`

### Model Selection

We used an ensemble of models:
- **XGBoost** for structured data
- **Random Forest** for stability
- **Neural Network** for pattern detection

### Implementation

\`\`\`python
import xgboost as xgb
from sklearn.ensemble import RandomForestClassifier

class FraudDetector:
    def __init__(self):
        self.xgb_model = xgb.XGBClassifier()
        self.rf_model = RandomForestClassifier(n_estimators=100)
        
    def predict(self, features):
        xgb_pred = self.xgb_model.predict_proba(features)[:, 1]
        rf_pred = self.rf_model.predict_proba(features)[:, 1]
        
        # Ensemble prediction
        final_pred = 0.6 * xgb_pred + 0.4 * rf_pred
        
        return {
            'fraud_probability': final_pred[0],
            'action': 'block' if final_pred > 0.85 else 'review' if final_pred > 0.5 else 'allow'
        }
\`\`\`

## Results

| Metric | Before | After |
|--------|--------|-------|
| Fraud Rate | 3.2% | 1.3% |
| False Positives | 8.5% | 2.1% |
| User Experience | Good | Excellent |

## Key Learnings

1. **Balance security and UX** - Too many blocks frustrate users
2. **Continuous training** - Retrain models weekly with new data
3. **Fallback rules** - Keep rule-based backup for edge cases
4. **Monitoring** - Track metrics in real-time

## Conclusion

AI-powered fraud detection is essential for modern payment systems. The investment in ML infrastructure pays for itself through reduced fraud and improved user trust.

---

## Questions About Implementation?

I'm happy to share more details about this implementation.

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Let's connect](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'Full-Stack Developer',
    date: '2026-01-20',
    category: 'AI/ML',
    tags: ['AI', 'Machine Learning', 'Fraud Detection', 'Python', 'Java'],
    readTime: '12 min read',
    featured: false,
  },
  {
    slug: 'building-real-time-chat-app-websocket-node-js',
    title: 'Building Real-Time Chat App with WebSocket & Node.js',
    excerpt:
      'Learn to create a real-time chat application using WebSocket, Node.js, and Socket.io for efficient communication and scalable architecture.',
    content: `## Introduction to Real-Time Chat Applications

Real-time chat applications have become an essential component of modern web and mobile applications. They enable instant communication between users, enhancing user engagement and experience. In this blog post, we will explore how to build a real-time chat application using WebSocket, Node.js, and Socket.io.

## What is WebSocket?

WebSocket is a protocol that enables bidirectional, real-time communication between a client and a server over the web. It allows for the efficient exchange of data, making it an ideal choice for real-time applications such as chat, gaming, and live updates.

## Setting Up the Project

To get started, we need to set up a new Node.js project and install the required dependencies:

\`\`\`bash
npm init -y
npm install express socket.io
\`\`\`

## Creating the Server

\`\`\`javascript
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let users = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (username) => {
    users.push({ id: socket.id, username });
    socket.broadcast.emit('newUser', username);
  });

  socket.on('sendMessage', (message) => {
    socket.broadcast.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
\`\`\`

## Creating the Client

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Real-Time Chat App</title>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <h1>Real-Time Chat App</h1>
  <input id="username" type="text" placeholder="Enter username">
  <button id="join-btn">Join Chat</button>
  <div id="chat-log"></div>
  <input id="message" type="text" placeholder="Type a message">
  <button id="send-btn">Send</button>
</body>
</html>
\`\`\`

## Conclusion

Building real-time chat applications with WebSocket and Socket.io is straightforward. Focus on handling connections properly, managing user state, and implementing proper error handling for production environments.

---

## Let's Connect!

Want to learn more about real-time applications? Reach out!

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Connect with me](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'Full-Stack Developer',
    date: '2026-03-18',
    category: 'Engineering',
    tags: ['WebSocket', 'Node.js', 'Real-time', 'Socket.io', 'Chat'],
    readTime: '8 min read',
    featured: false,
  },
  {
    slug: 'typescript-tutorial-beginner-guide',
    title: "TypeScript Tutorial: A Beginner's Guide",
    excerpt:
      'Learn TypeScript from scratch with this comprehensive guide for JavaScript developers, covering setup, syntax, and best practices.',
    content: `## Introduction to TypeScript

TypeScript is a statically typed, multi-paradigm language developed by Microsoft as a superset of JavaScript. It's designed to help developers catch errors early and improve code quality.

## Why TypeScript?

- **Static typing**: Catch errors at compile time
- **Better IDE support**: Enhanced autocomplete and refactoring
- **Modern features**: Support for ES6+ features
- **Better maintainability**: Self-documenting code with types

## Setting Up TypeScript

\`\`\`bash
npm install -g typescript
tsc --init
\`\`\`

## Basic Types

\`\`\`typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Objects
interface User {
  name: string;
  age: number;
  email?: string;
}

const user: User = {
  name: "John",
  age: 30,
};
\`\`\`

## Functions

\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (x: number, y: number): number => x * y;
\`\`\`

## Classes

\`\`\`typescript
class Person {
  constructor(public name: string, public age: number) {}
  
  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}
\`\`\`

## Generics

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("Hello");
\`\`\`

## Conclusion

TypeScript significantly improves developer experience and code quality. Start with basic types and gradually incorporate more advanced features as you become comfortable.

---

## Questions?

I'm happy to help with your TypeScript journey!

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Let's connect](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'Full-Stack Developer',
    date: '2026-03-17',
    category: 'Tutorial',
    tags: ['TypeScript', 'JavaScript', 'Tutorial', 'Beginners'],
    readTime: '10 min read',
    featured: false,
  },
];

export const blogPostsFr: BlogPost[] = [
  {
    slug: 'building-scalable-saas-spring-boot-react',
    title: 'Construire un SaaS Évolutif avec Spring Boot & React',
    excerpt:
      'Un guide complet pour architecturer des applications SaaS cloud-native utilisant Spring Boot pour le backend et React pour le frontend.',
    content: `## Introduction

La construction d'une application SaaS évolutive nécessite des décisions architecturales minutieuses. Dans ce guide, je partagerai mes expériences dans la création d'applications de niveau entreprise.

## Architecture

Une application SaaS bien structurée suit une architecture modulaire:

\`\`\`
Frontend: React + TypeScript + Tailwind CSS
Backend: Spring Boot + Java 17
Base de données: PostgreSQL
Cache: Redis
Cloud: AWS/GCP
CI/CD: GitHub Actions + Docker
\`\`\`

## Principes Clés

### 1. Architecture Microservices

Divisez votre application en services.domaines:

- **Service Utilisateur**: Authentification
- **Service Facturation**: Paiements
- **Service Core**: Logique métier

### 2. Conception de Base de Données

Utilisez PostgreSQL avec des index appropriés.

### 3. Conception d'API

Concevez des API RESTful suivant les meilleures pratiques.

## Optimisation des Performances

- **Frontend**: Code splitting, memoization
- **Backend**: Cache Redis, connection pooling

## Sécurité

1. **OAuth2 + JWT** pour l'authentification
2. **Rate limiting** pour prévenir les abus
3. **Validation des entrées**
4. **HTTPS** partout

## Conclusion

La construction d'un SaaS évolutif nécessite une approche holistique.

---

## Des Questions?

Je suis toujours heureux d'aider! Contactez-moi:

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Connectez-vous](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'Développeur Full-Stack',
    date: '2026-03-15',
    category: 'Ingénierie',
    tags: ['Spring Boot', 'React', 'SaaS', 'Architecture', 'Java'],
    readTime: '8 min',
    featured: true,
  },
  {
    slug: 'cicd-pipeline-docker-github-actions',
    title: 'Configuration CI/CD avec Docker & GitHub Actions',
    excerpt:
      'Guide étape par étape pour construire des pipelines de déploiement automatisés réduisant le temps de déploiement de 35%.',
    content: `## Introduction

L'Intégration Continue et le Déploiement Continu (CI/CD) sont essentiels pour le développement moderne. Dans ce tutoriel, je vous montrerai comment mettre en place un pipeline CI/CD robuste.

## Pourquoi CI/CD?

- **Versions plus rapides**: Des semaines aux heures
- **Moins de bugs**: Les tests automatisés détectent les problèmes tôt
- **Cohérence**: Même processus à chaque fois
- **Rollback**: Réversion facile en cas de problème

## Configuration Docker

Containerisons notre application:

\`\`\`dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Résultats

Après implémentation:
- **Temps de déploiement**: Réduit de 45 min à 15 min (67% plus rapide)
- **Déploiements échoués**: Réduits de 80%
- **Temps de rollback**: Moins de 5 minutes

## Conclusion

CI/CD n'est plus optionnel. Commencez petit, itérez, et améliorez continuellement votre pipeline.

---

## Contactez-moi!

Besoin d'aide pour configurer votre pipeline CI/CD?

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Écrivez-moi](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'Développeur Full-Stack',
    date: '2026-02-28',
    category: 'DevOps',
    tags: ['Docker', 'GitHub Actions', 'CI/CD', 'DevOps'],
    readTime: '10 min',
    featured: false,
  },
  {
    slug: 'ai-powered-fraud-detection-payment-gateways',
    title: 'Détection de Fraude IA dans les Passerelles de Paiement',
    excerpt:
      "Comment j'ai construit un système de détection de fraude ML qui a réduit les transactions frauduleuses de 60%.",
    content: `## Introduction

La fraude aux paiements est un problème croissant pour les entreprises en ligne. Dans cet article, je partage comment j'ai implémenté un système de détection de fraude alimenté par l'IA.

## Le Problème

Les systèmes traditionnels basés sur des règles:
- Taux élevés de faux positifs
- Mises à jour manuelles constantes
- Ne détectent pas les nouveaux patterns de fraude

## Solution: Apprentissage Automatique

### Ingénierie des Caractéristiques

\`\`\`python
features = [
    'transaction_amount',
    'user_age_days',
    'transaction_frequency_24h',
    'ip_country_match',
]
\`\`\`

## Résultats

| Métrique | Avant | Après |
|----------|-------|-------|
| Taux de Fraude | 3.2% | 1.3% |
| Faux Positifs | 8.5% | 2.1% |

## Conclusion

La détection de fraude par IA est essentielle pour les systèmes de paiement modernes.

---

## Questions?

Je suis heureux de partager plus de détails.

- **Email**: xsmafred@gmail.com
- **LinkedIn**: [Connectons-nous](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'Développeur Full-Stack',
    date: '2026-01-20',
    category: 'IA/ML',
    tags: ['IA', 'Machine Learning', 'Détection de Fraude'],
    readTime: '12 min',
    featured: false,
  },
];

export const blogPostsZh: BlogPost[] = [
  {
    slug: 'building-scalable-saas-spring-boot-react',
    title: '使用 Spring Boot & React 构建可扩展 SaaS',
    excerpt:
      '使用 Spring Boot 作为后端、React 作为前端的云原生 SaaS 应用架构综合指南。',
    content: `## 简介

构建可扩展的 SaaS 应用需要仔细的架构决策。在本指南中，我将分享使用 Spring Boot 和 React 构建企业级应用的经验。

## 架构概述

一个结构良好的 SaaS 应用遵循模块化架构：

\`\`\`
前端: React + TypeScript + Tailwind CSS
后端: Spring Boot + Java 17
数据库: PostgreSQL
缓存: Redis
云: AWS/GCP
CI/CD: GitHub Actions + Docker
\`\`\`

## 可扩展性关键原则

### 1. 微服务架构

将应用拆分为领域服务：

- **用户服务**：认证与授权
- **计费服务**：支付与订阅
- **核心服务**：主要业务逻辑

### 2. 数据库设计

使用 PostgreSQL 和适当的索引。

## 性能优化

- **前端**：代码分割、记忆化
- **后端**：Redis 缓存、连接池

## 安全最佳实践

1. **OAuth2 + JWT** 认证
2. **限流** 防止滥用
3. **输入验证**
4. **全站 HTTPS**

## 结论

构建可扩展的 SaaS 需要整体方法。

---

## 有问题吗？

我很乐意提供帮助！联系方式：

- **邮箱**: xsmafred@gmail.com
- **领英**: [联系我](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: '全栈开发工程师',
    date: '2026-03-15',
    category: '工程',
    tags: ['Spring Boot', 'React', 'SaaS', '架构', 'Java'],
    readTime: '8 分钟',
    featured: true,
  },
];

export const blogPostsJa: BlogPost[] = [
  {
    slug: 'building-scalable-saas-spring-boot-react',
    title: 'Spring Boot & React でスケーラブルな SaaS を構築',
    excerpt:
      'Spring Boot をバックエンド、React をフロントエンドとして使用し、クラウドネイティブ SaaS アプリケーションをアーキテクチャする包括的ガイド。',
    content: `## はじめに

スケーラブルな SaaS アプリケーションを構築するには、慎重なアーキテクチャの決定が必要です。このガイドでは、Spring Boot と React を使用してエンタープライズグレードのアプリケーションを構築した経験からの洞察を共有します。

## アーキテクチャ概要

適切に構造化された SaaS アプリケーションは、モジュラーアーキテクチャに従います：

\`\`\`
フロントエンド: React + TypeScript + Tailwind CSS
バックエンド: Spring Boot + Java 17
データベース: PostgreSQL
キャッシュ: Redis
クラウド: AWS/GCP
CI/CD: GitHub Actions + Docker
\`\`\`

## スケーラビリティの重要原則

### 1. マイクロサービスアーキテクチャ

アプリケーションをドメイン焦点の服務に分割します。

### 2. データベース設計

適切なインデックスを使用して PostgreSQL を使用します。

## パフォーマンス最適化

- **フロントエンド**: コード分割、メモ化
- **バックエンド**: Redis キャッシュ、接続プール

## セキュリティのベストプラクティス

1. **OAuth2 + JWT** 認証
2. **レート制限** で虐待を防ぐ
3. **入力検証**
4. **常時 HTTPS**

## 結論

スケーラブルな SaaS の構築には、全体的なアプローチが必要です。

---

## ご質問はありますか？

喜んでお手伝いします！联系方式：

- **メール**: xsmafred@gmail.com
- **LinkedIn**: [つながる](https://linkedin.com/in/prosper-merimee)
- **WhatsApp**: +237 691-958-707`,
    author: 'Mouil Prosper',
    authorTitle: 'フルスタック開発者',
    date: '2026-03-15',
    category: 'エンジニアリング',
    tags: ['Spring Boot', 'React', 'SaaS', 'アーキテクチャ', 'Java'],
    readTime: '8 分',
    featured: true,
  },
];

export const blogPosts = blogPostsEn;

export function getBlogPostsByLocale(locale: string): BlogPost[] {
  switch (locale) {
    case 'fr':
      return blogPostsFr;
    case 'zh':
      return blogPostsZh;
    case 'ja':
      return blogPostsJa;
    default:
      return blogPostsEn;
  }
}

export function getBlogPostBySlug(
  slug: string,
  locale: string = 'en'
): BlogPost | undefined {
  const posts = getBlogPostsByLocale(locale);
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPostsEn.map((post) => post.slug);
}

export function getFeaturedPost(locale: string = 'en'): BlogPost | undefined {
  const posts = getBlogPostsByLocale(locale);
  return posts.find((post) => post.featured);
}

export function getRecentPosts(
  count: number = 3,
  locale: string = 'en'
): BlogPost[] {
  const posts = getBlogPostsByLocale(locale);
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export type { BlogPost } from './blog-generator';
