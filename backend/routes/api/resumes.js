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
    ],
    order: [
      [{model: ResumeSkill}, 'id', 'ASC']
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

router.put('/projectBullets/:bulletId', requireAuth, async (req, res, next) => {
  const bullets = await ProjectBullets.findByPk(req.params.bulletId)

  if (!bullets) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Bullet Not Found"
    err.errors = {message: "The requested bullet couldn't be found"}
    return next(err)
  }

  bullets.set(req.body)
  await bullets.save()

  res.status(201).json(bullets)
})

router.post('/projectBullets', requireAuth, async (req, res, next) => {
  try {
    const newBullet = ProjectBullets.build(req.body)
    newBullet.validate()
    await newBullet.save()
    return res.status(201).json(newBullet)
  } catch(err) {
    return next(err)
  }
})

router.delete('/projectBullets/:bulletId', requireAuth, async (req, res, next) => {
  const bullet = await ProjectBullets.findByPk(req.params.bulletId)

  if (!bullet) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Bullet Not Found"
    err.errors = {message: "The requested bullet couldn't be found"}
    return next(err)
  }

  bullet.destroy()

  res.json({message: "Successfully Deleted"})
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
