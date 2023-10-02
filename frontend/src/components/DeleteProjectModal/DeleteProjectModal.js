import { useContext, useState } from 'react'
import { ResetContext } from '../../context/ResetContext'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import './DeleteProjectModal.css'

const DeleteProjectModal = ({ project }) => {
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  const deleteProjectClass = "deleteProjectModal" + (darkMode ? " deleteProjectModal-dark" : " deleteProjectModal-light")
  const yesButtonClass = "deleteProjectModal-yes" + (darkMode ? " deleteProjectModal-yes-dark" : " deleteProjectModal-yes-light")
  const noButtonClass = "deleteProjectModal-no" + (darkMode ? " deleteProjectModal-no-dark" : " deleteProjectModal-no-light")

  const noButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const deleteButton = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const res = await csrfFetch(`/api/projects/${project.id}`, {
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

  return (
    <div className={deleteProjectClass}>
      <h1>Delete {project.name}?</h1>
      <h2>Are you sure?</h2>
      <h2>This change will be <span>permanent</span>.</h2>
      {(isSubmitted && Object.values(errors).length > 0) && <ul>
          {Object.values(errors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <div>
        <button className={yesButtonClass} onClick={deleteButton}>Yes</button>
        <button className={noButtonClass} onClick={noButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteProjectModal
