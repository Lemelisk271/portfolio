import { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'

const DeleteSocialMediaModal = ({ social }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()
  const { reset, setReset } = useContext(ResetContext)

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const deleteButton = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const res = await csrfFetch(`/api/socials/${social.id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      setReset(!reset)
      closeModal()
    } else {
      const data = await res.json()
      if (data && data.errors) {
        setErrors(data.errors)
      }
    }
  }

  const deleteSocialMediaClass = "deleteSocialMediaModal" + (darkMode ? " deleteSocialMediaModal-dark" : " deleteSocialMediaModal-light")
  const deleteSocialYesButtonClass = "deleteSocialMediaModal-yesButton" + (darkMode ? " deleteSocialMediaModal-yesButton-dark" : " deleteSocialMediaModal-yesButton-light")
  const deleteSocialNoButtonClass = "deleteSocialMediaModal-noButton" + (darkMode ? " deleteSocialMediaModal-noButton-dark" : " deleteSocialMediaModal-noButton-light")

  return (
    <div className={deleteSocialMediaClass}>
      <h1>Delete {social.name}</h1>
      <h2>Are you sure?</h2>
      <h2>This change will be <span>permanent</span>.</h2>
      {(isSubmitted && Object.values(errors).length > 0) && <ul>
          {Object.values(errors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <div>
        <button className={deleteSocialYesButtonClass} onClick={deleteButton}>Yes</button>
        <button className={deleteSocialNoButtonClass} onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteSocialMediaModal
