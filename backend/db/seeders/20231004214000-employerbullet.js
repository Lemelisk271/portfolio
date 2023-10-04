'use strict';

/** @type {import('sequelize-cli').Migration} */

const { EmployerBullet, Employer } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const bulletList = [
  {
    company: 'Wilson Logistics',
    bullet: 'Tracked my own schedule to assure that deliveries would be made on time.'
  },
  {
    company: 'Wilson Logistics',
    bullet: 'Calculated and maintained a log of working hours to be in compliance with state and federal laws.'
  },
  {
    company: 'Internal Revenue Service',
    bullet: 'Advised a wide range of individuals who had varying degrees of understanding of their tax requirements and provided procedural explanations to specific inquiries initiated by the individual.'
  },
  {
    company: 'Internal Revenue Service',
    bullet: 'Resolved outstanding tax liabilities by assisting individuals with making a payment or setting up an installment agreement.'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    for (let bullet of bulletList) {
      const employer = await Employer.findOne({
        where: {
          company: bullet.company
        }
      })
      seeds.push({
        bullet: bullet.bullet,
        employerId: employer.id
      })
    }

    await EmployerBullet.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EmployerBullets'
    return queryInterface.bulkDelete(options)
  }
};
