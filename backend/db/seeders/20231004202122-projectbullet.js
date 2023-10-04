'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ProjectBullets, Project } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const bulletSeeds = [
  {
    project: "TaskWombat",
    bullet: "Utilized AWS S3 to implement image uploads reducing service storage and allowing the site’s image services to be scalable."
  },
  {
    project: "TaskWombat",
    bullet: "Implemented React throughout the site to allow the content to dynamically change as needed."
  },
  {
    project: "Welp",
    bullet: "Integrated a flask backend to allow the site to query the database."
  },
  {
    project: "Welp",
    bullet: "Streamlined database queries by creating and using a Redux store."
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []
    const projects = await Project.findAll()

    for (let bullet of bulletSeeds) {
      for (let project of projects) {
        if (project.name === bullet.project) {
          seeds.push({
            bullet: bullet.bullet,
            projectId: project.id
          })
        }
      }
    }

    await ProjectBullets.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ProjectBullets'
    return queryInterface.bulkDelete(options)
  }
};
