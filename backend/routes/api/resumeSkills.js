const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { ResumeSkill } = require('../../db/models')

router.put('/:skillId', requireAuth, async (req, res, next) => {
  const skill = await ResumeSkill.findByPk(req.params.skillId)

  if (!skill) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Skill Not Found"
    err.errors = {message: "The requested skill couldn't be found"}
    return next(err)
  }

  skill.set(req.body)
  await skill.save()

  res.status(201).json(skill)
})

module.exports = router
