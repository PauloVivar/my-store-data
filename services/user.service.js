//logica de negocio

// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
//const getConnection = require('../lib/postgres');
const pool = require('../lib/postgres.pool');

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));

  }

  async create(data) {
    return data;
  }

  async find() {
    //return [];
    //const client = await getConnection();                      //conexión con la bdd lib postgres
    //const rta = await client.query('SELECT * FROM task');

    const query = 'SELECT * FROM task';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
