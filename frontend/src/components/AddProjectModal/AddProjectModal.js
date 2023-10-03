import { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import './AddProjectModal.css'

const AddProjectModal = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [name, setName] = useState('')
  const [liveLink, setLiveLink] = useState('')
  const [repoLink, setRepoLink] = useState('')
  const [about, setAbout] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

   // eslint-disable-next-line
   const urlReg = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

  useEffect(() => {
    const errors = {}

    if (image === null) {
      errors.image= "Please Select an Image"
    }

    if (name.length === 0) {
      errors.name = "Please Enter a Name for the Project"
    }

    if (!urlReg.test(liveLink)) {
      errors.liveLink = "Please Enter a Valid Live Link"
    }

    if (!urlReg.test(repoLink)) {
      errors.repoLink = "Please Enter a Valid Repo Link"
    }

    if (about.length === 0)  {
      errors.about = "Please Tell us About the Project"
    }

    setValidationErrors(errors)
    // eslint-disable-next-line
  }, [image, name, liveLink, repoLink, about])

  useEffect(() => {
    if (!image) {
      setPreviewImage(null)
      return
    }

    const objectUrl = URL.createObjectURL(image)
    setPreviewImage(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [image])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const formData = new FormData()
    formData.append("image", image)
    formData.append("userId", sessionUser.id)
    formData.append("name", name)
    formData.append("liveLink", liveLink)
    formData.append("repoLink", repoLink)
    formData.append("about", about)

    const res = await csrfFetch(`/api/projects`, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
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

  const updateFile = (e) => {
    const file = e.target.files[0]
    if (file) setImage(file)
  }

  const projectModalClass = "addProjectModal" + (darkMode ? " addProjectModal-dark" : " addProjectModal-light")

  return (
    <div className={projectModalClass}>
      <h1>Add a Project</h1>
      {image && <>
        <p>Preview Image</p>
        <img src={previewImage} alt="Preview"/>
      </>}
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='previewImage'>Preview Image:</label>
          <input
            id='previewImage'
            type='file'
            accept='image/*'
            onChange={updateFile}
          />
        </div>
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
          <label htmlFor='about'>About:</label>
          <textarea
            id='about'
            value={about}
            onChange={e => setAbout(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddProjectModal
