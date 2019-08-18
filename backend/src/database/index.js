import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';

const models = [User, File, Meetup];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);
    this.init();
    this.associate();
  }

  init() {
    models.map(model => model.init(this.connection));
  }

  associate() {
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
