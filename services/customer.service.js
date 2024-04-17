//logica de negocio

// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');

//sequelize con db
const { models } = require('./../lib/sequelize');

class CustomerService {
  constructor() {
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer){
      throw boom.notFound('cliente no encontrado');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy(id);
    return { id };
  }
}

module.exports = CustomerService;
