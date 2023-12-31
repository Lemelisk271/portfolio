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
    name: 'TaskWombat',
    liveLink: 'https://taskwombat.onrender.com/',
    repoLink: 'https://github.com/Lemelisk271/taskwombat',
    about: 'A service site based on',
    previewImage: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/taskwombat.png',
    cloneLink: 'https://www.taskrabbit.com/',
    cloneName: 'TaskRabbit',
    role: 'Full Stack Developer',
    frontend: 'React',
    backend: 'Node'
  },
  {
    username: 'zwsmith27',
    name: 'Welp',
    liveLink: 'https://welp-686p.onrender.com/',
    repoLink: 'https://github.com/Lemelisk271/welp-group-project',
    about: 'A group project based on',
    previewImage: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/welp.png',
    cloneLink: 'https://www.yelp.com/',
    cloneName: 'Yelp',
    role: 'Full Stack Developer',
    frontend: 'React',
    backend: 'Flask'
  },
  {
    username: 'zwsmith27',
    name: 'Showup',
    liveLink: 'https://showup.onrender.com/',
    repoLink: 'https://github.com/Lemelisk271/ShowUp',
    about: 'A meeting site based on',
    previewImage: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/showup.png',
    cloneLink: 'https://www.meetup.com/',
    cloneName: 'Meetup',
    role: 'Full Stack Developer',
    frontend: 'React',
    backend: 'Node'
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
            cloneLink: project.cloneLink,
            cloneName: project.cloneName,
            about: project.about,
            previewImage: project.previewImage,
            userId: user.id,
            role: project.role,
            frontend: project.frontend,
            backend: project.backend
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
