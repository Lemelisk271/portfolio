import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'

const ResumeSkillForm = ({ skill, page }) => {
  const [title, setTitle] = useState("")
  const [newSkill, setNewSkill] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    if (page === 'edit') {
      setTitle(`Edit ${skill.skill}`)
      setNewSkill(skill.skill)
    } else {
      setTitle('Add Skill')
    }
  }, [])

  useEffect(() => {
    const errors = {}

    if (newSkill.length === 0) {
      errors.newSkill = "Please Enter a Skill"
    }

    setValidationErrors(errors)
  }, [newSkill])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    if (page === 'edit') {
      const skillObj = {
        skill: newSkill
      }

      console.log(skillObj)
    }
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
        <div className='resumeSkillForm-buttons'>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ResumeSkillForm
