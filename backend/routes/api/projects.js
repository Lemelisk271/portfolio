const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { Project } = require('../../db/models')
const { singleMulterUpload, removeFileFromS3, singlePublicFileUpload } = require('../../awsS3.js')

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

router.put("/images/:projectId", requireAuth, singleMulterUpload("image"), async (req, res, next) => {
  const project = await Project.findByPk(req.params.projectId)

  if (!project) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Project Not Found"
    err.errors = {message: "The requested project couldn't be found."}
    return next(err)
  }

  if (project.previewImage.split(".")[0] === 'https://zwsmith-portfolio') {
    removeFileFromS3(project.previewImage)
  }

  const previewImage = await singlePublicFileUpload(req.file)

  project.set({
    previewImage
  })
  await project.save()

  return res.status(201).json(project)
})

router.delete("/:projectId", requireAuth, async (req, res, next) => {
  const project = await Project.findByPk(req.params.projectId)

  if (!project) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Project Not Found"
    err.errors = {message: "The Requested Project Couldn't be Found."}
    return next(err)
  }

  if (project.previewImage.split(".")[0] === 'https://zwsmith-portfolio') {
    removeFileFromS3(project.previewImage)
  }

  project.destroy()

  res.json({message: "SuccessFully Deleted"})
})

module.exports = router
