import { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'

const AddSkillModal = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [skill, setSkill] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = {}

    if (image === null) {
      errors.image = "Please Select an Image"
    }

    if (skill.length === 0) {
      errors.skill = "Please Enter the Name of the Skill"
    }

    setValidationErrors(errors)
  }, [image, skill])

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
    formData.append("userId", sessionUser.id)
    formData.append("skill", skill)

    const res = await csrfFetch('/api/skills', {
      method: 'POST',
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

  const addSkillClass = "addSkillModal" + (darkMode ? " addSkillModal-dark" : " addSkillModal-light")

  return (
    <div className={addSkillClass}>
      <h1>Add a Skill</h1>
      {image && <>
        <p>Preview Image</p>
        <img src={previewImage} alt="Preview"/>
      </>}
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='icon'>Icon:</label>
          <input
            id='icon'
            type='file'
            accept='image/*'
            onChange={updateFile}
          />
        </div>
        <div>
          <label htmlFor='skill'>Skill:</label>
          <input
            id='skill'
            type='text'
            value={skill}
            onChange={e => setSkill(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddSkillModal
