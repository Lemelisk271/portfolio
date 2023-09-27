import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import './ProjectListItem.css'

const ProjectListItem = ({ project }) => {
  const { darkMode } = useContext(DarkModeContext)

  const projectListItemClass = "projectListItem" + (darkMode ? " projectListItem-dark" : " projectListItem-light")
  const projectListItemLinksClass = "projectListItem-links" + (darkMode ? " projectListItem-links-dark" : " projectListItem-links-light")

  return (
    <div className={projectListItemClass}>
      <h2>{project.name}</h2>
      <a href={project.liveLink} target='_blank' rel="noreferrer"><img src={project.previewImage} alt={project.name}/></a>
      <p>{project.about}</p>
      <div className={projectListItemLinksClass}>
        <a href={project.liveLink} target='_blank' rel="noreferrer">Live Site</a>
        <a href={project.repoLink} target='_blank' rel="noreferrer">Repository</a>
      </div>
    </div>
  )
}

export default ProjectListItem
