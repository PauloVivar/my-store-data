const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const status = Joi.boolean();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  status: status.required(),
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
  status: status,
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema }
