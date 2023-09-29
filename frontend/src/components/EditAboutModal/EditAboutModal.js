import { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DarkModeContext } from '../../context/DarkModeContext'
import { updateUser } from '../../store/session'
import { useModal } from '../../context/Modal'
import './EditAboutModal.css'

const EditAboutModal = ({ user }) => {
  const dispatch = useDispatch()
  const [about, setAbout] = useState(user.about)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = {}

    if (about.length === 0) {
      errors.about = "Please Fill out the About Section"
    }

    setValidationErrors(errors)
  }, [about])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const aboutObj = {
      about
    }

    return dispatch(updateUser(user.id, aboutObj))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json()
      if (data && data.errors) {
        setValidationErrors(data.errors)
      }
    })
  }

  const editAboutClass = "editAboutModal" + (darkMode ? " editAboutModal-dark" : " editAboutModal-light")

  return (
    <div className={editAboutClass}>
      <h1>Edit About {user.firstName} {user.lastName}</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <textarea
          id='about'
          value={about}
          onChange={e => setAbout(e.target.value)}
          cols={100}
          rows={30}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default EditAboutModal
