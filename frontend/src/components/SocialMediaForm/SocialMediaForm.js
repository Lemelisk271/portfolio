import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { DarkModeContext } from '../../context/DarkModeContext'
import { ResetContext } from '../../context/ResetContext'

const SocialMediaForm = ({ social, page }) => {
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [link, setLink] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  // eslint-disable-next-line
  const urlReg = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

  useEffect(() => {
    if (page === 'edit') {
      setTitle(`Edit ${social.name}`)
      setName(social.name)
      setIcon(social.icon)
      setLink(social.link)
    } else {
      setTitle('Add Social Media')
    }
  }, [])

  useEffect(() => {
    const errors = {}

    if (name.length === 0) {
      errors.name = "Please enter a name"
    }

    if (icon.length === 0) {
      errors.icon = "Please enter the className of a Font Awesome icon"
    }

    if (!urlReg.test(link)) {
      errors.link = "Please enter a valid URL"
    }

    setValidationErrors(errors)
  }, [name, icon])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    if (page === 'edit') {
      const socialObj = {
        name,
        icon,
        link
      }

      const res = await csrfFetch(`/api/socials/${social.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(socialObj)
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

  const socialMediaFormClass = 'socialMediaForm' + (darkMode ? " socialMediaForm-dark" : " socialMediaForm-light")

  return (
    <div className={socialMediaFormClass}>
      <h1>{title}</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      {icon.length > 0 &&
      <>
        <p>Preview Icon</p>
        <i className={icon}></i>
      </>
      }
      <form onSubmit={handleSubmit}>
        <div className='socialMediaForm-input'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='socialMediaForm-input'>
          <label htmlFor='icon'>Icon</label>
          <input
            id='icon'
            type='text'
            value={icon}
            onChange={e => setIcon(e.target.value)}
          />
        </div>
        <div className='socialMediaForm-input'>
          <label htmlFor='link'>Link</label>
          <input
            id='link'
            type='text'
            value={link}
            onChange={e => setLink(e.target.value)}
          />
        </div>
        <div className='socialMediaForm-buttons'>
          <button type='submit'>Submit</button>
          <button onClick={cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default SocialMediaForm
