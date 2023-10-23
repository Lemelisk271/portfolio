import { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import { csrfFetch } from '../../store/csrf'
import './DeleteProjectBulletPointModal.css'

const DeleteProjectBulletPointModal = ({ bullet }) => {
  const [isSubMitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const { reset, setReset } = useContext(ResetContext)
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const deleteButton = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const res = await csrfFetch(`/api/resumes/projectBullets/${bullet.id}`, {
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

  const deleteBulletClass = "deleteProjectBulletPointModal" + (darkMode ? " deleteProjectBulletPointModal-dark" : " deleteProjectBulletPointModal-light")
  const deleteBulletButtonClass = "deleteProjectBulletPointModal-buttons" + (darkMode ? " deleteProjectBulletPointModal-buttons-dark" : " deleteProjectBulletPointModal-buttons-light")
  const deleteButtonBulletClass = "deleteProjectBulletPointModal-delete" + (darkMode ? " deleteProjectBulletPointModal-delete-dark" : " deleteProjectBulletPointModal-delete-light")
  const cancelButtonBulletClass = "deleteProjectBulletPointModal-cancel" + (darkMode ? " deleteProjectBulletPointModal-cancel-dark" : " deleteProjectBulletPointModal-cancel-light")

  return (
    <div className={deleteBulletClass}>
      <h1>Delete Bullet?</h1>
      <p>{bullet.bullet}</p>
      <h2>Are you sure?</h2>
      <h2>This change will be <span>permanent</span>.</h2>
      {(isSubMitted && Object.values(errors).length > 0) && <ul>
          {Object.values(errors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <div className={deleteBulletButtonClass}>
        <button className={deleteButtonBulletClass} onClick={deleteButton}>Yes</button>
        <button className={cancelButtonBulletClass} onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteProjectBulletPointModal
