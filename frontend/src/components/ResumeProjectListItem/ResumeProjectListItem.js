import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'

const ResumeProjectListItem = ({ project }) => {
  const { darkMode } = useContext(DarkModeContext)

  console.log(project)

  const resumeProjectListItemClass = "resumeProjectListItem" + (darkMode ? " resumeProjectListItem-dark" : " resumeProjectListItem-light")

  return (
    <div className={resumeProjectListItemClass}>
      <div className='resumeProjectListItem-header'>
        <div className='resumeProjectListItem-headerInfo'>
          <h3>{project.name}</h3>
          <p>A site based on <a href={project.cloneLink} target='_blank' rel="noreferrer">{project.cloneName}</a></p>
        </div>
        <div className='resumeProjectListItem-headerLinks'>
          <a href={project.liveLink} target='_blank' rel="noreferrer">Live</a>
          <a href={project.repoLink} target='_blank' rel="noreferrer">GitHub Repo</a>
        </div>
      </div>
    </div>
  )
}

export default ResumeProjectListItem
