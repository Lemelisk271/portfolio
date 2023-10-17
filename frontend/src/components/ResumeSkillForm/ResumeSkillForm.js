import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'

const ResumeSkillForm = ({ skill, page }) => {
  const [title, setTitle] = useState("")
  const [newSkill, setNewSkill] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  useEffect(() => {
    if (page === 'edit') {
      setTitle(`Edit ${skill.skill}`)
      setNewSkill(skill.skill)
      setCategory(skill.category)
    } else {
      setTitle('Add Skill')
    }
  }, [])

  useEffect(() => {
    const errors = {}

    if (newSkill.length === 0) {
      errors.newSkill = "Please Enter a Skill"
    }

    if (category.length === 0) {
      errors.category = "Please select a Category"
    }

    setValidationErrors(errors)
  }, [newSkill, category])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    if (page === 'edit') {
      const skillObj = {
        skill: newSkill,
        category
      }

      const res = await csrfFetch(`/api/resumeSkills/${skill.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(skillObj)
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

  const resumeSkillFormClass = "resumeSkillForm" + (darkMode ? " resumeSkillForm-dark" : " resumeSkillForm-light")

  return (
    <div className={resumeSkillFormClass}>
      <h1>{title}</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div className='resumeSkillForm-input'>
            <label htmlFor='skill'>Skill</label>
            <input
              id='skill'
              type='text'
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
            />
        </div>
        <div className='resumeSkillForm-input'>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option disabled value=''>Select a Category</option>
            <option value='frontend'>Frontend</option>
            <option value='backend'>Backend</option>
            <option value='expertise'>Expertise</option>
          </select>
        </div>
        <div className='resumeSkillForm-buttons'>
          <button type='submit'>Save</button>
          <button onClick={cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ResumeSkillForm
