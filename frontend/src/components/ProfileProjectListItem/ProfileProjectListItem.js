import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import EditProjectModal from '../EditProjectModal'
import OpenModalButton from '../OpenModalButton'
import ChangeProjectImageModal from '../ChangeProjectImageModal'
import './ProfileProjectListItem.css'

const ProfileProjectListItem = ({ project }) => {
  const { darkMode } = useContext(DarkModeContext)

  const listItemClass = "profileProjectListItem" + (darkMode ? " profileProjectListItem-dark" : " profileProjectListItem-light")
  const listItemButtonClass = "profileProjectListItem-buttons" + (darkMode ? " profileProjectListItem-buttons-dark" : " profileProjectListItem-buttons-light")

  return (
    <div className={listItemClass}>
      <img src={project.previewImage} alt={project.name}/>
      <table>
        <tbody>
          <tr>
            <th scope='row'>Name:</th>
            <td>{project.name}</td>
          </tr>
          <tr>
            <th scope='row'>Live Link:</th>
            <td>{project.liveLink}</td>
          </tr>
          <tr>
            <th scope='row'>Repo Link:</th>
            <td>{project.repoLink}</td>
          </tr>
          <tr>
            <th scope='row'>About:</th>
            <td>{project.about}</td>
          </tr>
        </tbody>
      </table>
      <div className={listItemButtonClass}>
        <OpenModalButton
          buttonText="Edit Project"
          modalComponent={<EditProjectModal project={project}/>}
        />
        <OpenModalButton
          buttonText="Change Project Image"
          modalComponent={<ChangeProjectImageModal project={project} />}
        />
        <button>Delete Project</button>
      </div>
    </div>
  )
}

export default ProfileProjectListItem
