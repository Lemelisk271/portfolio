const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const imageRouter = require('./images.js')
const { restoreUser } = require('../../utils/auth.js')

router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('images', imageRouter)

module.exports = router
