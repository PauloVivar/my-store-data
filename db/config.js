
//variables de entorno
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//aca podemos mandar la url de cualquier BD ejem aws, mysql, maria db; en este caso pasamos postgres
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//Aca podemos  empezar a correr las migraciones DB

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
}
