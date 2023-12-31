import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { DarkModeContext } from '../../context/DarkModeContext'
import { ResetContext } from '../../context/ResetContext'
import './SocialMediaForm.css'

const SocialMediaForm = ({ social, page }) => {
  const sessionUser = useSelector(state => state.session.user)
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
  const urlReg = /^(https:|http:|www\.)\S*/

  useEffect(() => {
    if (page === 'edit') {
      setTitle(`Edit ${social.name}`)
      setName(social.name)
      setIcon(social.icon)
      setLink(social.link)
    } else {
      setTitle('Add Social Media')
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [name, icon, link])

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
    } else {
      const newSocialObj = {
        name,
        icon,
        link,
        userId: sessionUser.id
      }

      const res = await csrfFetch('/api/socials', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newSocialObj)
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
  const socialMediaFormButtons = 'socialMediaForm-buttons' + (darkMode ? " socialMediaForm-buttons-dark" : " socialMediaForm-buttons-light")

  return (
    <div className={socialMediaFormClass}>
      <h1>{title}</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      {icon.length > 0 &&
      <div className='socialMediaForm-preview'>
        <p>Preview Icon</p>
        <i className={icon}></i>
      </div>
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
        <div className={socialMediaFormButtons}>
          <button type='submit'>Submit</button>
          <button onClick={cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default SocialMediaForm
