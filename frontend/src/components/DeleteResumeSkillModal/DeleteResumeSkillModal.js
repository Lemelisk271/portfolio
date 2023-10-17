import { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'

const DeleteResumeSkillModal = ({ skill }) => {
  const [isSubMitted, setIsSubmitted] = useState(false)
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

    const res = await csrfFetch(`/api/resumeSkills/${skill.id}`, {
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

  const deleteResumeSkillClass = 'deleteResumeSkillModal' + (darkMode ? " deleteResumeSkillModal-dark" : " deleteResumeSkillModal-light")
  const deleteResumeSkillButtonClass = "deleteResumeSkillModal-buttons" + (darkMode ? " deleteResumeSkillModal-buttons-dark" : " deleteResumeSkillModal-buttons-light")
  const deleteButtonSkillClass = "deleteResumeSkillModal-delete" + (darkMode ? " deleteResumeSkillModal-delete-dark" : " deleteResumeSkillModal-delete-light")
  const cancelButtonSkillClass = "deleteResumeSkillModal-cancel" + (darkMode ? " deleteResumeSkillModal-cancel-dark" : " deleteResumeSkillModal-cancel-light")

  return (
    <div className={deleteResumeSkillClass}>
      <h1>Delete {skill.skill}?</h1>
      <h2>Are you sure?</h2>
      <h2>This change will be <span>permanent</span>.</h2>
      {(isSubMitted && Object.values(errors).length > 0) && <ul>
          {Object.values(errors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <div className={deleteResumeSkillButtonClass}>
        <button className={deleteButtonSkillClass} onClick={deleteButton}>Yes</button>
        <button className={cancelButtonSkillClass} onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteResumeSkillModal
