const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { Employer } = require('../../db/models')

router.put('/:employerId', requireAuth, async (req, res, next) => {
  const employer = await Employer.findByPk(req.params.employerId)

  if (!employer) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Employer Not Found"
    err.errors = {message: "The requested employer couldn't be found"}
    return next(err)
  }

  employer.set(req.body)

  await employer.save()

  res.status(201).json(employer)
})

router.delete('/:employerId', requireAuth, async (req, res, next) => {
  const employer = await Employer.findByPk(req.params.employerId)

  if (!employer) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Employer Not Found"
    err.errors = {message: "The requested employer couldn't be found"}
    return next(err)
  }

  employer.destroy()

  res.json({message: "Successfully Deleted"})
})

module.exports = router
