
//mejor practica para la conexionn a la BD.
const { Pool } = require('pg');

//variables de entorno
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//aca podemos mandar lam url de cualquiier BD ejem aws, mysql; en este caso pasamos postgres
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const pool = new Pool({ connectionString: URI });

/*
//mal apractica no se debe mandar user y password en texto plano sino se debe mandar con variables de entorno
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'userv',
  password: 'uservroot',
  database: 'my_store'
});
*/

module.exports = pool;
