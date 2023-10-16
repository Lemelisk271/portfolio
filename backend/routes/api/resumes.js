const express = require('express')
const router = express.Router()
const { Resume, User, Social, ResumeSkill, ProjectBullets, Employer, EmployerBullet, Education } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

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

router.get('/employer/:userId', async (req, res, next) => {
  const employers = await Employer.findAll({
    where: {
      userId: req.params.userId
    }
  })

  if (!employers) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Employer Not Found"
    err.errors = {message: "The Requested User Doesn't have any Employers"}
    return next(err)
  }

  return res.json(employers)
})

router.get('/employerbullet/:employerId', async (req, res, next) => {
  const employerBullets = await EmployerBullet.findAll({
    where: {
      employerId: req.params.employerId
    }
  })

  if (!employerBullets) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Bullets not Found"
    err.errors = {message: "The Requested Employer Doesn't Have any Bullets"}
    return next(err)
  }

  return res.json(employerBullets)
})

router.get('/education/:userId', async (req, res, next) => {
  const education = await Education.findAll({
    where: {
      userId: req.params.userId
    }
  })

  if (!education) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Education Not Found"
    err.errors = {message: "The Requested User Doesn't Have any Education Listed"}
    return next(err)
  }

  return res.json(education)
})

router.put('/:resumeId', requireAuth, async (req, res, next) => {
  const resume = await Resume.findByPk(req.params.resumeId)

  if (!resume) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Resume Not Found"
    err.errors = {message: "The requested resume couldn't be found"}
    return next(err)
  }

  resume.set(req.body)

  await resume.save()

  res.status(201).json(resume)
})

module.exports = router
