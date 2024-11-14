// src/entities/PostEntity.js

export default class PostEntity {
    constructor({ id = null, title = "", slug = null, content = "", createdAt = new Date() } = {}) {
      this.id = id;
      this.title = title;
      this.slug = slug;
      this.content = content;
      this.createdAt = createdAt;
    }
  }
  