import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'
import './ProjectBulletPointForm.css'

const ProjectBulletPointForm = ({ bullet, page, projectId }) => {
  const [title, setTitle] = useState('')
  const [newBullet, setNewBullet] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()
  const { reset, setReset } = useContext(ResetContext)

  useEffect(() => {
    if (page === 'edit') {
      setTitle('Edit Bullet')
      setNewBullet(bullet.bullet)
    } else {
      setTitle('Add Bullet')
    }
  }, [])

  useEffect(() => {
    const errors = {}

    if (newBullet.length === 0) {
      errors.newBullet = "Please enter the bullet point"
    }

    setValidationErrors(errors)
  }, [newBullet])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    if (page === 'edit') {
      const bulletObj = {
        bullet: newBullet,
        projectId: bullet.projectId
      }

      const res = await csrfFetch(`/api/resumes/projectBullets/${bullet.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bulletObj)
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
    } else {
      const newBulletObj = {
        bullet: newBullet,
        projectId
      }

      const res = await csrfFetch('/api/resumes/projectBullets', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBulletObj)
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
  }

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const projectBulletFormClass = "projectBulletPointForm" + (darkMode ? " projectBulletPointForm-dark" : " projectBulletPointForm-light")
  const projectBulletButtonClass = "projectBulletPointForm-formButtons" + (darkMode ? " projectBulletPointForm-formButtons-dark" : " projectBulletPointForm-formButtons-light")

  return (
    <div className={projectBulletFormClass}>
      <h1>{title}</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div className='projectBulletPointForm-formInput'>
          <label htmlFor='newBullet'>Bullet:</label>
          <textarea
            id='newBullet'
            value={newBullet}
            onChange={e => setNewBullet(e.target.value)}
            rows={5}
          />
        </div>
        <div className={projectBulletButtonClass}>
          <button type='submit'>Save</button>
          <button onClick={cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ProjectBulletPointForm
