'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Skill, User } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const skillList = [
  {
    skill: "CSS",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/CSS.png'
  },
  {
    skill: "GIT",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/git.png'
  },
  {
    skill: "HTML",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/html.png'
  },
  {
    skill: "JavaScript",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/JavaScript.png'
  },
  {
    skill: "MySQL",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/mysql.png'
  },
  {
    skill: "Node",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/node.png'
  },
  {
    skill: "PostgreSQL",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/PostgreSQL.png'
  },
  {
    skill: "Python",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/python.png'
  },
  {
    skill: "React",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/react.png'
  },
  {
    skill: "Redux",
    icon: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/redux.png'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const users = await User.findAll()

    for (let user of users) {
      for (let skill of skillList) {
        seeds.push({
          skill: skill.skill,
          icon: skill.icon,
          userId: user.id
        })
      }
    }

    await Skill.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Skills'
    return queryInterface.bulkDelete(options)
  }
};
