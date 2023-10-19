import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import './EditResumeTitleModal.css'
import { DarkModeContext } from '../../context/DarkModeContext'

const EditResumeTitleModal = ({ user, resume }) => {
  const [title, setTitle] = useState(resume.title)
  const [role, setRole] = useState(resume.role)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { reset, setReset } = useContext(ResetContext)
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()

  useEffect (() => {
    const errors = {}

    if (title.length === 0) {
      errors.title = "Please enter a title"
    }

    if (role.length === 0) {
      errors.role = "Please enter a role"
    }

    setValidationErrors(errors)
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const resumeObj = {
      title,
      role,
      userId: user.id
    }

    const res = await csrfFetch(`/api/resumes/${resume.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resumeObj)
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

  const editResumeTitleClass = "editResumeTitleModal" + (darkMode ? " editResumeTitleModal-dark" : " editResumeTitleModal-light")

  return (
    <div className={editResumeTitleClass}>
      <h1>Edit Resume Title</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='role'>Role</label>
          <input
            id='role'
            type='text'
            value={role}
            onChange={e => setRole(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditResumeTitleModal
