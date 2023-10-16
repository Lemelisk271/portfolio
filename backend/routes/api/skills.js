const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { Skill } = require('../../db/models')
const { singleMulterUpload, removeFileFromS3, singlePublicFileUpload } = require('../../awsS3.js')

router.put('/:skillId', requireAuth, async (req, res, next) => {
  const skill = await Skill.findByPk(req.params.skillId)

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

router.put("/:skillId/image", requireAuth, singleMulterUpload("image"), async (req, res, next) => {
  const skill = await Skill.findByPk(req.params.skillId)

  if (!skill) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Skill Not Found"
    err.errors = {Message: "The requested skill couldn't be found."}
    return next(err)
  }

  if (skill.icon.split(".")[0] === 'https://zwsmith-portfolio') {
    removeFileFromS3(skill.icon)
  }

  const icon = await singlePublicFileUpload(req.file)

  skill.set({
    icon
  })
  await skill.save()

  res.status(201).json(skill)
})

router.delete("/:skillId", requireAuth, async (req, res, next) => {
  const skill = await Skill.findByPk(req.params.skillId)

  if (!skill) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Skill Not Found"
    err.errors = {message: "The requested skill couldn't be found."}
    next(err)
  }

  if (skill.icon.split(".")[0] === 'https://zwsmith-portfolio') {
    removeFileFromS3(skill.icon)
  }

  skill.destroy()

  res.json({message: "Successfully Deleted"})
})

router.post('/', requireAuth, singleMulterUpload("image"), async (req, res, next) => {
  const { skill, userId } = req.body
  const icon = await singlePublicFileUpload(req.file)
  try {
    const newSkill = Skill.build({
      skill,
      icon,
      userId
    })
    newSkill.validate()
    await newSkill.save()
    return res.status(201).json(newSkill)
  } catch (err) {
    return next(err)
  }
})

module.exports = router
