import { useContext } from "react"
import { DarkModeContext } from '../../context/DarkModeContext'
import OpenModalButton from '../OpenModalButton'
import EditSkillModal from '../EditSkillModal'
import './ProfileSkillListItem.css'

const ProfileSkillListItem = ({ skill }) => {
  const { darkMode } = useContext(DarkModeContext)

  const profileSkillListClass = "profileSkillListItem" + (darkMode ? " profileSkillListItem-dark" : " profileSkillListItem-light")
  const profileSkillButtonClass = "profileSkillListItem-button" + (darkMode ? " profileSkillListItem-button-dark" : " profileSkillListItem-button-light")

  return (
    <div className={profileSkillListClass}>
      <img src={skill.icon} alt={skill.skill}/>
      <h3>{skill.skill}</h3>
      <div className={profileSkillButtonClass}>
        <OpenModalButton
          buttonText="Edit Name"
          modalComponent={<EditSkillModal skill={skill}/>}
        />
        <button>Change Icon</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default ProfileSkillListItem
