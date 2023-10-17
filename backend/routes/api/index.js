const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const imageRouter = require('./images.js')
const projectRouter = require('./projects.js')
const skillRouter = require('./skills.js')
const resumeRouter = require('./resumes.js')
const socialsRouter = require('./socials.js')
const resumeSkillsRouter = require('./resumeSkills.js')
const { restoreUser } = require('../../utils/auth.js')

router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/images', imageRouter)
router.use('/projects', projectRouter)
router.use('/skills', skillRouter)
router.use('/resumes', resumeRouter)
router.use('/socials', socialsRouter)
router.use('/resumeSkills', resumeSkillsRouter)

module.exports = router
