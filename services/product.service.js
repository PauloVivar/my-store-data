const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

// const pool = require('../lib/postgres.pool');
const { models } = require('./../lib/sequelize');


class ProductsService {

  constructor(){
    // array solo en memoria
    // this.products = [];
    // this.generate();

    //conexion bdd pool
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));

    //--> se cambia por sequelize que lo gestiona por detras y automatico a difrencia de pool
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    /*
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
    */
    const newProduct = await models.Product.create(data);
    return newProduct;

  }

  async find(query) {
    //const query = 'SELECT * FROM task';
    //const rta = await this.pool.query(query);    --->pool
    //const [data] = await models.query(query);    --->sequelize sin orm

    //Paginación y Filtro de Rangos
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if(price){
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,   //>=
        [Op.lte]: price_max    //<=
      }
    }

    //con orm gestion de CRUD
    const products = await models.Product.findAll(options);
    return products;

    //return rta.rows;     --->pool
    //return data;         --->sequelize sin orm
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('producto no encontrado');
    }
    if (product.isBlock) {
      throw boom.conflict('producto bloqueado');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto no encontrado');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('producto no encontrado');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
