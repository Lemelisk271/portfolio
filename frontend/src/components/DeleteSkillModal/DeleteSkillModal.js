import { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'

const DeleteSkillModal = ({ skill }) => {
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

    const res = await csrfFetch(`/api/skills/${skill.id}`, {
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

  const deleteSkillClass = "deleteSkillModal" + (darkMode ? " deleteSkillModal-dark" : " deleteSkillModal-light")
  const deleteSkillYesButtonClass = "deleteSkillModal-yes" + (darkMode ? " deleteSkillModal-yes-dark" : " deleteSkillModal-yes-light")
  const deleteSkillNoButtonClass = "deleteSkillModal-no" + (darkMode ? " deleteSkillModal-no-dark" : " deleteSkillModal-no-light")

  return (
    <div className={deleteSkillClass}>
      <h1>Delete {skill.skill}?</h1>
      <h2>Are you sure?</h2>
      <h2>This change will be <span>permanent</span>.</h2>
      {(isSubMitted && Object.values(errors).length > 0) && <ul>
          {Object.values(errors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <button className={deleteSkillYesButtonClass} onClick={deleteButton}>Yes</button>
      <button className={deleteSkillNoButtonClass} onClick={cancelButton}>No</button>
    </div>
  )
}

export default DeleteSkillModal
