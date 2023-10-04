'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ResumeSkill, Resume } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const skillList = [
  {
    resume: 'Software Engineer',
    skills: [
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "Python",
      "Redux",
      "GIT",
      "PostgreSQL",
      "Node.js",
      "SQLite3",
      "Express",
      "AWS S3"
    ]
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    for (let skillSet of skillList) {
      const resume = await Resume.findOne({
        where: {
          title: skillSet.resume
        }
      })
      for (let skill of skillSet.skills) {
        seeds.push({
          skill: skill,
          resumeId: resume.id
        })
      }
    }

    await ResumeSkill.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ResumeSkills'
    return queryInterface.bulkDelete(options)
  }
};
