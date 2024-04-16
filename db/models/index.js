const { User, UserSchema } = require ('./user.model');
const { Customer, CustomerSchema } = require ('./customer.model.js');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  //generar la asociación bidireccional entre tablas users y customers
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);

}

module.exports = setupModels;
