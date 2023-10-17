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
    skill: 'React.js',
    category: 'frontend'
  },
  {
    resume: 'Software Engineer',
    skill: 'Redux',
    category: 'frontend'
  },
  {
    resume: 'Software Engineer',
    skill: 'JavaScript',
    category: 'frontend'
  },
  {
    resume: 'Software Engineer',
    skill: 'HTML',
    category: 'frontend'
  },
  {
    resume: 'Software Engineer',
    skill: 'CSS',
    category: 'frontend'
  },
  {
    resume: 'Software Engineer',
    skill: 'Node.js',
    category: 'backend'
  },
  {
    resume: 'Software Engineer',
    skill: 'Express',
    category: 'backend'
  },
  {
    resume: 'Software Engineer',
    skill: 'SQL',
    category: 'backend'
  },
  {
    resume: 'Software Engineer',
    skill: 'PostgreSQL',
    category: 'backend'
  },
  {
    resume: 'Software Engineer',
    skill: 'Python',
    category: 'backend'
  },
  {
    resume: 'Software Engineer',
    skill: 'AWS S3',
    category: 'backend'
  },
  {
    resume: 'Software Engineer',
    skill: 'Algorithms',
    category: 'expertise'
  },
  {
    resume: 'Software Engineer',
    skill: 'Architecture',
    category: 'expertise'
  },
  {
    resume: 'Software Engineer',
    skill: 'Debugging',
    category: 'expertise'
  },
  {
    resume: 'Software Engineer',
    skill: 'Deployment',
    category: 'expertise'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    for (let skill of skillList) {
      const resume = await Resume.findOne({
        where: {
          title: skill.resume
        }
      })

      seeds.push({
        skill: skill.skill,
        category: skill.category,
        resumeId: resume.id
      })
    }

    await ResumeSkill.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ResumeSkills'
    return queryInterface.bulkDelete(options)
  }
};
