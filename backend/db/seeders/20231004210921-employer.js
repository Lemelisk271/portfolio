'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Employer, User } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const employerList = [
  {
    username: 'zwsmith27',
    company: 'Wilson Logistics',
    position: 'Truck Driver',
    location: 'Springfield, MO',
    startDate: 'Oct 2018',
    endDate: 'Apr 2021'
  },
  {
    username: 'zwsmith27',
    company: 'Internal Revenue Service',
    position: 'Contact Representative',
    location: 'Seattle, WA',
    startDate: 'Nov 2009',
    endDate: 'Oct 2018'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    for (let employer of employerList) {
      const user = await User.findOne({
        where: {
          username: employer.username
        }
      })
      seeds.push({
        company: employer.company,
        position: employer.position,
        location: employer.location,
        startDate: employer.startDate,
        endDate: employer.endDate,
        userId: user.id
      })
    }

    await Employer.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Employers'
    return queryInterface.bulkDelete(options)
  }
};
