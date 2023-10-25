import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import { ResetContext } from '../../context/ResetContext'
import ResumeProfileProjectBullets from '../ResumeProfileProjectBullets'
import ProjectBulletPointForm from '../ProjectBulletPointForm'
import OpenModalButton from '../OpenModalButton'
import './ResumeProfileProjectListItem.css'

const ResumeProfileProjectListItem = ({ project }) => {
  const [bullets, setBullets] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/projectBullets/${project.id}`)
      const bulletData = await res.json()
      setBullets(bulletData)
      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [reset])

  const resumeProfileProjectClass = "resumeProfileProjectListItem" + (darkMode ? " resumeProfileProjectListItem-dark" : " resumeProfileProjectListItem-light")
  const resumeProfileProjectBulletClass = "resumeProfileProjectListItem-bullets" + (darkMode ? " resumeProfileProjectListItem-bullets-dark" : " resumeProfileProjectListItem-bullets-light")
  const resumeProfileProjectBulletButtonClass = "resumeProfileProjectListItem-buttons" + (darkMode ? " resumeProfileProjectListItem-buttons-dark" : " resumeProfileProjectListItem-buttons-light")

  return (
    <div className={resumeProfileProjectClass}>
      {isLoaded ? (
        <>
          <h3>{project.name}</h3>
          <div className={resumeProfileProjectBulletClass}>
            {bullets.map((bullet, i) => (
              <ResumeProfileProjectBullets key={i} bullet={bullet}/>
            ))}
          </div>
          <div className={resumeProfileProjectBulletButtonClass}>
            <OpenModalButton
              buttonText={`Add Bullet to ${project.name}`}
              modalComponent={<ProjectBulletPointForm page='new' project={project} />}
            />
          </div>
        </>
      ):(
        <>
          <p>Loading...</p>
        </>
      )}
    </div>
  )
}

export default ResumeProfileProjectListItem
