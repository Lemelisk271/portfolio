const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { Project } = require('../../db/models')

router.put("/:projectId", requireAuth, async (req, res, next) => {
  const project = await Project.findByPk(req.params.projectId)

  if (!project) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Project Not Found"
    err.errors = {message: "The Request Project Couldn't be Found"}
    return next(err)
  }

  project.set(req.body)

  await project.save()

  res.status(201).json(project)
})

module.exports = router
