const express = require('express')
const bcrypt = require('bcryptjs')

const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { User, Skill, Project } = require('../../db/models')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation.js')

const router = express.Router()

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a last name.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more'),
  handleValidationErrors
]

router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body
  const hashedPassword = bcrypt.hashSync(password)
  const user = await User.create({ email, username, hashedPassword, firstName, lastName })

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username
  }

  await setTokenCookie(res, safeUser)

  return res.json({
    user: safeUser
  })
})

router.get('/', async (_req, res, next) => {
  const user = await User.findOne({
    where: {
      username: 'zwsmith'
    }
  })

  if (!user) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "User Not Found"
    err.errors = {message: "The requested user couldn't be found."}
    return next(err)
  }

  return res.json(user)
})

router.get('/:userId/skills', async (req, res, next) => {
  const skills = await Skill.findAll({
    where: {
      userId: req.params.userId
    }
  })

  if (!skills) {
    const err = newError("Not Found")
    err.status = 404
    err.title = "Skills Not Found"
    err.errors = {message: "There were no skills found for the selected user."}
    return next(err)
  }

  return res.json(skills)
})

router.get('/:userId/projects', async (req, res, next) => {
  const projects = await Project.findAll({
    where: {
      userId: req.params.userId
    }
  })

  if (!projects) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Projects Not Found"
    err.errors = {message: "There were no projects found for the selected user."}
    return next(err)
  }

  return res.json(projects)
})

module.exports = router
