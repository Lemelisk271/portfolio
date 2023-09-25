const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const groupsRouter = require('./groups.js')
const eventsRouter = require('./events.js')
const venuesRouter = require('./venues.js')
const groupImageRouter = require('./group-images.js')
const eventImageRouter = require('./event-images.js')
const { restoreUser } = require('../../utils/auth.js')

router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/groups', groupsRouter)
router.use('/events', eventsRouter)
router.use('/venues', venuesRouter)
router.use('/group-images', groupImageRouter)
router.use('/event-images', eventImageRouter)

module.exports = router
