import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import './ResumeProjectListItem.css'

const ResumeProjectListItem = ({ project }) => {
  const [bullets, setBullets] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/projectBullets/${project.id}`)
      const bulletData = await res.json()
      setBullets(bulletData)
      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [])

  const resumeProjectListItemClass = "resumeProjectListItem" + (darkMode ? " resumeProjectListItem-dark" : " resumeProjectListItem-light")

  return (
    <div className={resumeProjectListItemClass}>
      {isLoaded ? (
        <>
          <div className='resumeProjectListItem-header'>
            <div className='resumeProjectListItem-headerInfo'>
              <div className='resumeProjectListItem-headerTitle'>
                <p><strong>{project.name},</strong> {project.role} - {project.frontend} | {project.backend}</p>
              </div>
              <p>{project.about}<a href={project.cloneLink} target='_blank' rel="noreferrer">{project.cloneName}</a></p>
            </div>
            <div className='resumeProjectListItem-headerLinks'>
              <a href={project.liveLink} target='_blank' rel="noreferrer">{project.name} Live</a>
              <p>|</p>
              <a href={project.repoLink} target='_blank' rel="noreferrer">{project.name} GitHub Repo</a>
            </div>
          </div>
          <div className='resumeProjectListItem-bulletPoints'>
            <ul>
              {bullets.map((bullet, i) => (
                <li key={i}>{bullet.bullet}</li>
              ))}
            </ul>
          </div>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default ResumeProjectListItem
