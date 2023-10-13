const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { Social } = require('../../db/models')

router.get('/:userId', requireAuth, async (req, res, next) => {
  const socials = await Social.findAll({
    where: {
      userId: req.params.userId
    }
  })

  if (!socials) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Social Media Not Found"
    err.errors = {message: "The requested user doesn't have any social media listed"}
    return next(err)
  }

  return res.json(socials)
})

module.exports = router
