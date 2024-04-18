// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
const { models } = require('./../lib/sequelize');

class OrderService {
  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          //se anida informacion de order ,customer, user
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (!order){
      throw boom.notFound('orden de compra no encontrada');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
     return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy(id);
    return { id };
  }

}

module.exports = OrderService;
