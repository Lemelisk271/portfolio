import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'

const EditResumeTitleModal = ({ user, resume }) => {
  const [title, setTitle] = useState(resume.title)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  useEffect (() => {
    const errors = {}

    if (title.length === 0) {
      errors.title = "Please enter a title"
    }

    setValidationErrors(errors)
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const resumeObj = {
      title,
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

  return (
    <div>
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditResumeTitleModal
