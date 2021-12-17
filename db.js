const { Sequelize } = require("sequelize");

// TIM TEST

module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    dialect: "postgres", 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging : false,
    timezone: '08:00',
    dialectOptions: {
      // ssl: true,
      useUTC: false
    }
  }
);
