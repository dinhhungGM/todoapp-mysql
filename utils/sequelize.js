const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "todo",
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: process.env.MYSQL_PORT,
    logging: false,
  }
);

const connetDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to DB has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        console.log("Trying reconnecting...");
        setTimeout(() => {
            connetDB();
        }, 5000);
    }
}

connetDB();

module.exports = sequelize;
