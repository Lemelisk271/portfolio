'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Resume, User } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const resumeList = [
  {
    username: 'zwsmith27',
    title: 'Software Engineer',
    role: 'Full Stack Developer'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []
    const users = await User.findAll()

    for (let resume of resumeList) {
      for (let user of users) {
        if (user.username === resume.username) {
          seeds.push({
            title: resume.title,
            userId: user.id,
            role: resume.role
          })
        }
      }
    }

    await Resume.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Resumes'
    return queryInterface.bulkDelete(options)
  }
};
