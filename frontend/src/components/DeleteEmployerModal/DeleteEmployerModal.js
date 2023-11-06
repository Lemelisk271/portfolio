import { useContext, useState } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import { csrfFetch } from '../../store/csrf'

const DeleteEmployerModal = ({ employer }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const deleteButton = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const res = await csrfFetch(`/api/employers/${employer.id}`, {
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

  const deleteEmployerClass = "deleteEmployerModal" + (darkMode ? " deleteEmployerModal-dark" : " deleteEmployerModal-light")
  const deleteEmployerButtonClass = "deleteEmployerModal-buttons" + (darkMode ? " deleteEmployerModal-buttons-dark" : " deleteEmployerModal-buttons-light")
  const deleteEmployerDeleteButtonClass = "deleteEmployerModal-buttonsDelete" + (darkMode ? " deleteEmployerModal-buttonsDelete-dark": " deleteEmployerModal-buttonsDelete-light")
  const deleteEmployerCancelButtonClass = "deleteEmployerModal-buttonsCancel" + (darkMode ? " deleteEmployerModal-buttonsCancel-dark": " deleteEmployerModal-buttonsCancel-light")

  return (
    <div className={deleteEmployerClass}>
      <h1>Delete {employer.company}?</h1>
      <h2>Are you sure?</h2>
      <h2>This change will be <span>permanent</span>.</h2>
      {(isSubmitted && Object.values(errors).length > 0) && <ul>
          {Object.values(errors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <div className={deleteEmployerButtonClass}>
        <button className={deleteEmployerDeleteButtonClass} onClick={deleteButton}>Yes</button>
        <button className={deleteEmployerCancelButtonClass} onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteEmployerModal
