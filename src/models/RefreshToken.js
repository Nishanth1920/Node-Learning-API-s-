const db = require('../config/database');

class RefreshToken {
  static get tableName() {
    return 'refresh_tokens';
  }

  static async create(userId, token, expiresAt) {
    const [id] = await db(this.tableName).insert({
      user_id: userId,
      token,
      expires_at: expiresAt
    });
    return id;
  }

  static async findByToken(token) {
    return db(this.tableName)
      .where({ token })
      .where('expires_at', '>', db.fn.now())
      .first();
  }

  static async deleteByToken(token) {
    return db(this.tableName).where({ token }).del();
  }

  static async deleteByUserId(userId) {
    return db(this.tableName).where({ user_id: userId }).del();
  }

  static async deleteExpired() {
    return db(this.tableName).where('expires_at', '<', db.fn.now()).del();
  }
}

module.exports = RefreshToken;