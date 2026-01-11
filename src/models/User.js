const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static get tableName() {
    return 'users';
  }

  static async findAll() {
    return db(this.tableName)
      .select('id', 'name', 'email', 'age', 'created_at', 'updated_at')
      .orderBy('created_at', 'desc');
  }

  static async findById(id) {
    return db(this.tableName)
      .select('id', 'name', 'email', 'age', 'created_at', 'updated_at')
      .where({ id })
      .first();
  }

  static async findByIdWithPassword(id) {
    return db(this.tableName).where({ id }).first();
  }

  static async findByEmail(email) {
    return db(this.tableName).where({ email }).first();
  }

  static async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const [id] = await db(this.tableName).insert({
      ...userData,
      password: hashedPassword
    });
    
    return this.findById(id);
  }

  static async update(id, userData) {
    const updateData = { ...userData };
    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    await db(this.tableName)
      .where({ id })
      .update({
        ...updateData,
        updated_at: db.fn.now()
      });
    
    return this.findById(id);
  }

  static async delete(id) {
    return db(this.tableName).where({ id }).del();
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async count() {
    const result = await db(this.tableName).count('id as count').first();
    return result.count;
  }
}

module.exports = User;