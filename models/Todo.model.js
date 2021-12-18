const sequelize = require("../utils/sequelize");
const { Sequelize } = require("sequelize");

const TodoModel = sequelize.define(
    "todos",
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
    },
    {
        freezeTableName: true
    }
);

(async () => {
    await TodoModel.sync({ });
  })();

module.exports = TodoModel;