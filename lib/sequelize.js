//mejor practica para la conexion a la DB.
//SEQUELIZE nos gestiona los metodos CRUD automaticamnete haca la DB
const { Sequelize } = require('sequelize');

//variables de entorno
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//aca podemos mandar la url de cualquier BD ejem aws, mysql, maria db; en este caso pasamos postgres
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true
})

module.exports = sequelize;