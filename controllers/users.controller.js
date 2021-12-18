const UserModel = require("../models/User.model");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.status(200).json({
        message: "Users retrieved successfully",
        users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving users",
        error,
      });
    }
  }
};
