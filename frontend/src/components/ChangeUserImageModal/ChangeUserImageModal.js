import { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { updateImage } from '../../store/session'


const ChangeUserImageModal = ({ user }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = {}

    if (image === null) {
      errors.image = "Please select an image"
    }

    setValidationErrors(errors)
  }, [image])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    dispatch(updateImage(user.id, {image}))
      .then(closeModal)
      .catch(async (res) => {
        const data = res.json()
        if (data && data.errors) {
          setValidationErrors(data.errors)
        }
      })
  }

  const updateFile = (e) => {
    const file = e.target.files[0]
    if (file) setImage(file)
  }

  const userImageModalClass = "changeUserImageModal" + (darkMode ? " changeUserImageModal-dark" : " changeUserImageModal-light")

  return (
    <div className={userImageModalClass}>
      <h1>Change Profile Image</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={updateFile}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default ChangeUserImageModal
