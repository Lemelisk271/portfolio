const express = require('express')
const router = express.Router()
const { Resume, User, Social, ResumeSkill } = require('../../db/models')

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

module.exports = router
