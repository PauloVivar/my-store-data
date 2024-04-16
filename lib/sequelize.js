//mejor practica para la conexion a la DB.
//SEQUELIZE nos gestiona los metodos CRUD automaticamnete hacia la db
const { Sequelize } = require('sequelize');

//variables de entorno
const { config } = require('./../config/config');

//se declara para creacion de tablas en la db
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//acá podemos mandar la url de cualquier BD ejem aws, mysql, maria db; en este caso pasamos postgres

//const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  //dialect: 'mysql',
  dialect: 'postgres',
  logging: true
});

setupModels(sequelize);

/*crear tabla en DB, no se, recomienda, comando muy delicado que sobreescribe tabla en DB
Se utliza solo en ambientes de desarrollo y no en producción*/
//sequelize.sync();

module.exports = sequelize;
