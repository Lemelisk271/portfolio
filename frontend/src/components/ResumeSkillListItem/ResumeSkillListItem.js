import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import ResumeSkillForm from '../ResumeSkillForm'
import OpenModalButton from '../OpenModalButton'

const ResumeSkillListItem = ({ skill }) => {
  const { darkMode } = useContext(DarkModeContext)

  const resumeSkillClass = "resumeSkillListItem" + (darkMode ? " resumeSkillListItem-dark" : " resumeSkillListItem-light")
  const resumeSkillButtonClass = "resumeSkillListItem-buttons" + (darkMode ? " resumeSkillListItem-buttons-dark" : " resumeSkillListItem-buttons-light")

  return (
    <div className={resumeSkillClass}>
      <h3>{skill.skill}</h3>
      <p>{skill.category}</p>
      <div className={resumeSkillButtonClass}>
        <OpenModalButton
          buttonText="Edit Skill"
          modalComponent={<ResumeSkillForm skill={skill} page="edit"/>}
        />
        <button>Delete Skill</button>
      </div>
    </div>
  )
}

export default ResumeSkillListItem
