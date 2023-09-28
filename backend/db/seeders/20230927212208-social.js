'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Social, User } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const socialList = [
  {
    username: 'zwsmith27',
    name: 'GitHub',
    icon: 'fa-brands fa-square-github',
    link: 'https://github.com/Lemelisk271'
  },
  {
    username: 'zwsmith27',
    name: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    link: 'https://www.linkedin.com/in/zwsmith27/'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []
    const users = await User.findAll()

    for (let social of socialList) {
      for (let user of users) {
        if (user.username === social.username) {
          seeds.push({
            name: social.name,
            icon: social.icon,
            link: social.link,
            userId: user.id
          })
        }
      }
    }

    await Social.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Socials'
    return queryInterface.bulkDelete(options)
  }
};
