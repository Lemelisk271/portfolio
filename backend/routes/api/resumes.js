const express = require('express')
const router = express.Router()
const { Resume, User, Social, ResumeSkill, ProjectBullets } = require('../../db/models')

router.get('/:userId', async (req, res, next) => {
  const resume = await Resume.findOne({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: User,
        include: [
          {
            model: Social
          }
        ]
      },
      {
        model: ResumeSkill
      }
    ]
  })

  if (!resume) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Resume Not Found"
    err.errors = {message: "The Requested Resume Couldn't be Found"}
    return next(err)
  }

  return res.json(resume)
})

router.get('/projectBullets/:projectId', async (req, res, next) => {
  const projectBullets = await ProjectBullets.findAll({
    where: {
      projectId: req.params.projectId
    }
  })

  if (!projectBullets) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Bullets Not Found"
    err.errors = {message: "The Request Project Doesn't Have any Bullet Points"}
    return next(err)
  }

  return res.json(projectBullets)
})

module.exports = router
