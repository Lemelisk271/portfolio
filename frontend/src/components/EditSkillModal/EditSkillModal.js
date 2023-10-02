import { useContext, useState, useEffect } from "react"
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import './EditSkillModal.css'

const EditSkillModal = ({ skill }) => {
  const [newSkill, setNewSkill] = useState(skill.skill)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset, setReset } = useContext(ResetContext)
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = {}

    if (newSkill.length === 0) {
      errors.skill = "Please enter a name for the skill."
    }

    setValidationErrors(errors)
  }, [newSkill])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const skillObj = {
      skill: newSkill
    }

    const res = await csrfFetch(`/api/skills/${skill.id}`, {
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
      const data = res.json()
      if (data && data.errors) {
        setValidationErrors(data.errors)
      }
    }
  }

  const editSkillClass = "editSkillModal" + (darkMode ? " editSkillModal-dark" : " editSkillModal-light")

  return (
    <div className={editSkillClass}>
      <h1>Edit {skill.skill}</h1>
      {(isSubmitted && Object.values(validationErrors).length > -0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className="error">{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="skill">Skill:</label>
          <input
            id="skill"
            type="text"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default EditSkillModal
