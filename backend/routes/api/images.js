const express = require('express')
const router = express.Router()
const { requireAuth, setTokenCookie } = require('../../utils/auth.js')
const { User } = require('../../db/models')
const { singleMulterUpload, removeFileFromS3, singlePublicFileUpload } = require('../../awsS3.js')

router.put('/:userId', requireAuth, singleMulterUpload("image"), async (req, res, next) => {
  const user = await User.findByPk(req.params.userId)

  if (!user) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "User Not Found"
    err.errors = {message: "The Requested User Couldn't be Found"}
    return next (err)
  }

  if (user.profileImage.split(".")[0] === 'https://zwsmith-portfolio') {
    removeFileFromS3(user.profileImage)
  }

  const profileImage = await singlePublicFileUpload(req.file)

  user.set({
    profileImage
  })
  await user.save()

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username
  }

  await setTokenCookie(res, safeUser)

  return res.status(201).json({ user: safeUser})
})

module.exports = router
