const { User, UserSchema } = require ('./user.model');
const { Customer, CustomerSchema } = require ('./customer.model.js');
const { Category, CategorySchema } = require ('./category.model.js');
const { Product, ProductSchema } = require ('./product.model.js');
const { Order, OrderSchema } = require ('./order.model.js');
const { OrderProduct, OrderProductSchema } = require ('./order-product.model.js');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  Order.init(OrderSchema, Order.config(sequelize));

  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  //generar la asociación bidireccional entre tablas users y customers
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);

  //generar la asociación bidireccional entre tablas categories y products
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);

  //genera la asociasción de Ordes y la tabla ternaria OrderProduct
  Order.associate(sequelize.models);

}

module.exports = setupModels;
