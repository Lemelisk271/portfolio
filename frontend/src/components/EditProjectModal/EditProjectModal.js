import { useState, useEffect, useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import './EditProjectModal.css'

const EditProjectModal = ({ project }) => {
  const [name, setName] = useState(project.name)
  const [liveLink, setLiveLink] = useState(project.liveLink)
  const [repoLink, setRepoLink] = useState(project.repoLink)
  const [about, setAbout] = useState(project.about)
  const [cloneName, setCloneName] = useState(project.cloneName)
  const [cloneLink, setCloneLink] = useState(project.cloneLink)
  const [role, setRole] = useState(project.role)
  const [frontend, setFrontend] = useState(project.frontend)
  const [backend, setBackend] = useState(project.backend)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  // eslint-disable-next-line
  const urlReg = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

  useEffect(() => {
    const errors = {}

    if (name.length === 0) {
      errors.name = "Please Enter a Name for the Project"
    }

    if (!urlReg.test(liveLink)) {
      errors.liveLink = "Please Enter a Valid Live Link"
    }

    if (!urlReg.test(repoLink)) {
      errors.repoLink = "Please Enter a Valid Repo Link"
    }

    if (about.length === 0) {
      errors.about = "Please Fill out the About Section"
    }

    if (cloneName.length === 0) {
      errors.cloneName = "Please enter the name of the cloned site"
    }

    if (!urlReg.test(cloneLink)) {
      errors.cloneLink = "Please enter a valid clone link"
    }

    if (role.length === 0) {
      errors.role = "Please enter a role"
    }

    if (frontend.length === 0) {
      errors.frontend = "Please enter a frontend"
    }

    if (backend.length === 0) {
      errors.backend = "Please enter a backend"
    }

    setValidationErrors(errors)
    // eslint-disable-next-line
  }, [name, liveLink, repoLink, about, cloneLink, cloneName, role, frontend, backend])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const projectObj = {
      name,
      liveLink,
      repoLink,
      about,
      cloneLink,
      cloneName,
      role,
      frontend,
      backend
    }

    const res = await csrfFetch(`/api/projects/${project.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectObj)
    })
    if (res.ok) {
      setReset(!reset)
      closeModal()
    } else if (res.status < 500) {
      const data = await res.json()
      if (data.errors) {
        return data.errors
      }
    } else {
      return {message: "An Error Occurred, Please try Again."}
    }
  }

  const editProjectClass = "editProjectModal" + (darkMode ? " editProjectModal-dark" : " editProjectModal-light")

  return (
    <div className={editProjectClass}>
      <h1>Edit {project.name}</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='liveLink'>Live Link:</label>
          <input
            id='liveLink'
            type='text'
            value={liveLink}
            onChange={e => setLiveLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='repoLink'>Repo Link:</label>
          <input
            id='repoLink'
            type='text'
            value={repoLink}
            onChange={e => setRepoLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='cloneName'>Clone Name:</label>
          <input
            id='cloneName'
            type='text'
            value={cloneName}
            onChange={e => setCloneName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='cloneLink'>Clone Link:</label>
          <input
            id='cloneLink'
            type='text'
            value={cloneLink}
            onChange={e => setCloneLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='role'>Role:</label>
          <input
            id='role'
            type='text'
            value={role}
            onChange={e => setRole(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='frontend'>Frontend:</label>
          <input
            id='frontend'
            type='text'
            value={frontend}
            onChange={e => setFrontend(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='backend'>Backend:</label>
          <input
            id='backend'
            type='text'
            value={backend}
            onChange={e => setBackend(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='about'>About:</label>
          <textarea
            id='about'
            value={about}
            onChange={e => setAbout(e.target.value)}
            cols={30}
            rows={5}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default EditProjectModal
