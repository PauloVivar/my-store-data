//logica de negocio

// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
//const getConnection = require('../lib/postgres');
//const pool = require('../lib/postgres.pool');

//sequelize con db
const  { models } = require('./../lib/sequelize');


class UserService {
  constructor() {
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));

  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    //return [];
    //const client = await getConnection();                      //conexión con la DB lib postgres
    //const rta = await client.query('SELECT * FROM task');

    //const query = 'SELECT * FROM task';                        //conexión con la DB pool
    //const rta = await this.pool.query(query);
    //return rta.rows;

    const rta =  await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user){
      throw boom.notFound('usuario no encontrado');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy(id);
    return { id };
  }
}

module.exports = UserService;
