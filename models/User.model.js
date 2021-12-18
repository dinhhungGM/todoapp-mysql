const sequelize = require("../utils/sequelize");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserModel = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, saltRounds));
      },
    },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["username"],
      },
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

(async () => {
  await UserModel.sync({});
})();

module.exports = UserModel;
