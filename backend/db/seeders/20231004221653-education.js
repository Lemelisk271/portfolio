'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Education, User } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const educationSeeds = [
  {
    username: 'zwsmith27',
    school: 'App Academy',
    degree: 'Full Stack Software Development',
    year: '2023'
  },
  {
    username: 'zwsmith27',
    school: 'Bellevue College',
    degree: 'Associates Degree in General Studies',
    year: ''
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    for (let education of educationSeeds) {
      const user = await User.findOne({
        where: {
          username: education.username
        }
      })
      seeds.push({
        school: education.school,
        degree: education.degree,
        year: education.year,
        userId: user.id
      })
    }

    await Education.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Education'
    return queryInterface.bulkDelete(options)
  }
};
