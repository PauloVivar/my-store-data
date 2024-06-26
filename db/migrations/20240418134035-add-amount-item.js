'use strict';

const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('./../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(ORDER_PRODUCT_TABLE, 'amount', OrderProductSchema.amount);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(ORDER_PRODUCT_TABLE, 'amount');
  }
};
