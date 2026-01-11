const db = require('../config/database');

class User {
  static get tableName() {
    return 'users';
  }

  static async findAll() {
    return db(this.tableName).select('*').orderBy('created_at', 'desc');
  }

  static async findById(id) {
    return db(this.tableName).where({ id }).first();
  }

  static async findByEmail(email) {
    return db(this.tableName).where({ email }).first();
  }

  static async create(userData) {
    const [id] = await db(this.tableName).insert(userData);
    return this.findById(id);
  }

  static async update(id, userData) {
    await db(this.tableName)
      .where({ id })
      .update({
        ...userData,
        updated_at: db.fn.now()
      });
    return this.findById(id);
  }

  static async delete(id) {
    return db(this.tableName).where({ id }).del();
  }

  static async count() {
    const result = await db(this.tableName).count('id as count').first();
    return result.count;
  }
}

module.exports = User;