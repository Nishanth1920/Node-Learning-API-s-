const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const jwtConfig = require('../config/jwt');

class AuthService {
  generateAccessToken(user) {
    return jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        name: user.name
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
  }

  generateRefreshToken(user) {
    return jwt.sign(
      { 
        userId: user.id,
        type: 'refresh'
      },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiresIn }
    );
  }

  async register(userData) {
    const existingUser = await User.findByEmail(userData.email);
    
    if (existingUser) {
      const error = new Error('Email already exists');
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create(userData);
    
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create(user.id, refreshToken, expiresAt);

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async login(email, password) {
    const user = await User.findByEmail(email);
    
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await User.comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create(user.id, refreshToken, expiresAt);

    delete user.password;

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
      
      const storedToken = await RefreshToken.findByToken(refreshToken);
      
      if (!storedToken) {
        const error = new Error('Invalid refresh token');
        error.statusCode = 401;
        throw error;
      }

      const user = await User.findById(decoded.userId);
      
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      const newAccessToken = this.generateAccessToken(user);

      return {
        accessToken: newAccessToken
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const err = new Error('Refresh token expired');
        err.statusCode = 401;
        throw err;
      }
      throw error;
    }
  }

  async logout(refreshToken) {
    await RefreshToken.deleteByToken(refreshToken);
    return { message: 'Logged out successfully' };
  }

  async logoutAll(userId) {
    await RefreshToken.deleteByUserId(userId);
    return { message: 'Logged out from all devices' };
  }
}

module.exports = new AuthService();