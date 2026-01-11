const User = require('../models/User');

class UserService {
  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id) {
    const user = await User.findById(id);
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    return user;
  }

  async createUser(userData) {
    const existingUser = await User.findByEmail(userData.email);
    
    if (existingUser) {
      const error = new Error('Email already exists');
      error.statusCode = 409;
      throw error;
    }

    return await User.create(userData);
  }

  async updateUser(id, userData) {
    const user = await User.findById(id);
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    if (userData.email && userData.email !== user.email) {
      const existingUser = await User.findByEmail(userData.email);
      
      if (existingUser) {
        const error = new Error('Email already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    return await User.update(id, userData);
  }

  async deleteUser(id) {
    const user = await User.findById(id);
    
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    await User.delete(id);
    return { message: 'User deleted successfully' };
  }
}

module.exports = new UserService();