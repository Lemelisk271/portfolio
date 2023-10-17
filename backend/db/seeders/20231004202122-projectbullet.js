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
    bullet: "Implemented a styled web page using Wireframing as a guide and CSS to implement the site. This provided the user with a finished site that was easier to navigate."
  },
  {
    project: "TaskWombat",
    bullet: "Built a database using Sequelize to structure, store, and access data then render that data to the client via a front end framework."
  },
  {
    project: "Welp",
    bullet: "Integrated a database using SQLAlchemy to store data, create an API to access, update, and remove that data and render that data to the client through React."
  },
  {
    project: "Welp",
    bullet: "Created a Redux store using React0Redux to streamline database queries."
  },
  {
    project: "Welp",
    bullet: "Coordinated with team members through Git branches allowing us to use a single code base."
  },
  {
    project: "Showup",
    bullet: "Designed the site to use Node and Express this allowed the React front end to communicate with the back end framework."
  },
  {
    project: "Showup",
    bullet: "Incorporated custom user authentication utilizing the BCryptJs hashsync function on the backend and React Auth Routes on the frontend to prevent the storage of plain text passwords and restrict access to user specific data and features."
  },
  {
    project: "Showup",
    bullet: "Launched the website using a PostgreSQL database allowing the user to access, update, and remove data."
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
