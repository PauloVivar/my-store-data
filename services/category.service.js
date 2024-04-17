// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
//const pool = require('../lib/postgres.pool');

const { models } = require('./../lib/sequelize');

class CategoryService {

  constructor(){
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category){
      throw boom.notFound('categoría no encontrada');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
     return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy(id);
    return { id };
  }

}

module.exports = CategoryService;
