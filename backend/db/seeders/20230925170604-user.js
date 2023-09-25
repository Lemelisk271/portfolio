'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models')
const bcrypt = require('bcryptjs')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Jane',
        lastName: 'Doe',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ]

    await User.bulkCreate(seeds, { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']
      }
    }, {})
  }
};
