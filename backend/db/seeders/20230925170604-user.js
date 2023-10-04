'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models')
const bcrypt = require('bcryptjs')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = [
      {
        email: 'zwsmith27@gmail.com',
        username: 'zwsmith27',
        firstName: 'Zach',
        lastName: 'Smith',
        about: `I’ve always been interested in computer programming. I can remember playing with our first computer and being fascinated with it. When I grew older I thought that you had to have a four year degree to get a job as a programmer. Because I didn’t go to college I didn’t think that I’d be able to be a developer. However, when I learned about programming bootcamps I jumped at the chance to do what I’ve always wanted.\nThroughout my life I’ve worked at various jobs, mostly in the customer service industry. I’ve been the Assistant Manager at a GameStop, I’ve worked technical support for a veterinary supply company, I worked for the IRS for almost 10 years and most recently I was a long haul truck driver.\nI really like to program because I enjoy seeing my work come to life. There’s just something about starting with a blank slate and watching something you either created, or helped to create, take shape.\nAt App Academy I learned Python, JavaScript, HTML, CSS, and more. I’ve completed several projects, my last one was based off of the TaskRabbit site. It was built with an express and sequelize backend and a react front end. The site utilized other technologies such as AWS S3 and Redux.\nI believe I would make a good addition to the team for several reasons. Having gone through a coding bootcamp I know how to learn new things and apply that knowledge very quickly. I’ve already designed and built functioning full stack applications. I have excellent customer service skills and have the ability to distill complex technical concepts into explanations that most people will be able to understand. I am also able to work independently with minimal supervision.`,
        profileImage: 'https://patchstagram-zwsmith.s3.us-west-2.amazonaws.com/IMG_0893.jpg',
        phone: '4256985340',
        location: 'Ravensdale, WA',
        portfolio: 'https://portfolio-sugg.onrender.com/',
        hashedPassword: bcrypt.hashSync('password')
      }
    ]

    await User.bulkCreate(seeds, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options)
  }
};
