import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import ResumeSkillForm from '../ResumeSkillForm'
import OpenModalButton from '../OpenModalButton'
import DeleteResumeSkillModal from '../DeleteResumeSkillModal'
import './ResumeSkillListItem.css'

const ResumeSkillListItem = ({ skill }) => {
  const { darkMode } = useContext(DarkModeContext)

  const resumeSkillClass = "resumeSkillListItem" + (darkMode ? " resumeSkillListItem-dark" : " resumeSkillListItem-light")
  const resumeSkillButtonClass = "resumeSkillListItem-buttons" + (darkMode ? " resumeSkillListItem-buttons-dark" : " resumeSkillListItem-buttons-light")

  return (
    <div className={resumeSkillClass}>
      <p><strong>{skill.skill}</strong></p>
      <p>{skill.category}</p>
      <div className={resumeSkillButtonClass}>
        <OpenModalButton
          buttonText="Edit Skill"
          modalComponent={<ResumeSkillForm skill={skill} page="edit"/>}
        />
        <OpenModalButton
          buttonText="Delete Skill"
          modalComponent={<DeleteResumeSkillModal skill={skill} />}
        />
      </div>
    </div>
  )
}

export default ResumeSkillListItem
