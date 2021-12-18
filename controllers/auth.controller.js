const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    try {
      let user;

      user = await UserModel.findOne({
        where: {
          username,
        },
      });

      if (user) {
        return res.status(400).send({
          message: "Username has already existed",
        });
      }

      user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (user) {
        return res.status(400).send({
          message: "Email has already existed",
        });
      }

      user = await UserModel.create({
        username,
        password,
        email,
      });

      await user.save();
      res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating user",
        error,
      });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      let user;

      user = await UserModel.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(400).send({
          message: "Username is not existed",
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).send({
          message: "Password is not correct",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        message: "Login successfully",
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error logging in",
        error,
      });
    }
  },
  auth: async (req, res) => {
    const { id, username, email } = req.user;
    try {
      const user = await UserModel.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(400).send({
          message: "User is not existed",
        });
      }

      res.status(200).json({
        message: "Auth successfully",
        user: {
          id,
          username,
          email,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error logging in",
        error,
      });
    }
  },
};
