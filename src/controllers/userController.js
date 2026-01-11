const userService = require('../services/userService');
const authService = require('../services/authService');


class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      
      res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.validatedParams;
      const user = await userService.getUserById(id);
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

    async createUser(req, res, next) {
    try {
      const result = await authService.register(req.validatedData);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.validatedParams;
      const userData = req.validatedData;
      const user = await userService.updateUser(id, userData);
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.validatedParams;
      const result = await userService.deleteUser(id);
      
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();