import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import './ChangeUserSkillIconModal.css'

const ChangeUserSkillIconModal = ({ skill }) => {
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = {}

    if (image === null) {
      errors.image = "Please select an image"
    }

    setValidationErrors(errors)
  }, [image])

  useEffect(() => {
    if (!image) {
      setPreviewImage(null)
      return
    }

    const objectUrl = URL.createObjectURL(image)
    setPreviewImage(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const formData = new FormData()
    formData.append("image", image)
    const res = await csrfFetch(`/api/skills/${skill.id}/image`, {
      method: 'PUT',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
    if (res.ok) {
      setReset(!reset)
      closeModal()
    } else {
      const data = await res.json()
      if (data && data.errors) {
        setValidationErrors(data.errors)
      }
    }
  }

  const updateFile = (e) => {
    const file = e.target.files[0]
    if (file) setImage(file)
  }

  const skillIconClass = "changeUserSkillIcon" + (darkMode ? " changeUserSkillIcon-dark" : " changeUserSkillIcon-light")

  return (
    <div className={skillIconClass}>
      <h1>Change Icon for {skill.skill}</h1>
      {image && <>
        <p>Preview Image</p>
        <img src={previewImage} alt={skill.skill}/>
      </>}
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={updateFile}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default ChangeUserSkillIconModal
