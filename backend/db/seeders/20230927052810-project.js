'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Project, User } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const projectList = [
  {
    username: 'zwsmith27',
    name: 'Showup',
    liveLink: 'https://showup.onrender.com/',
    repoLink: 'https://github.com/Lemelisk271/ShowUp',
    about: 'A site based off of Meetup',
    previewImage: 'https://zwsmith-portfolio.s3.us-west-2.amazonaws.com/showup.png'
  },
  {
    username: 'zwsmith27',
    name: 'Welp',
    liveLink: 'https://welp-686p.onrender.com/',
    repoLink: 'https://github.com/Lemelisk271/welp-group-project',
    about: 'A site based off of Yelp',
    previewImage: 'https://zwsmith-portfolio.s3.us-west-2.amazonaws.com/welp.png'
  },
  {
    username: 'zwsmith27',
    name: 'TaskWombat',
    liveLink: 'https://taskwombat.onrender.com/',
    repoLink: 'https://github.com/Lemelisk271/taskwombat',
    about: 'A site based off of TaskRabbit',
    previewImage: 'https://zwsmith-portfolio.s3.us-west-2.amazonaws.com/taskwombat.png'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const users = await User.findAll()

    for (let project of projectList) {
      for (let user of users) {
        if (user.username === project.username) {
          seeds.push({
            name: project.name,
            liveLink: project.liveLink,
            repoLink: project.repoLink,
            about: project.about,
            previewImage: project.previewImage,
            userId: user.id
          })
        }
      }
    }

    await Project.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Projects'
    return queryInterface.bulkDelete(options)
  }
};
