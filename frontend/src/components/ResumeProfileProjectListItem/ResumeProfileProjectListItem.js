import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import { ResetContext } from '../../context/ResetContext'
import ResumeProfileProjectBullets from '../ResumeProfileProjectBullets'
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
  }, [reset])

  const resumeProfileProjectClass = "resumeProfileProjectListItem" + (darkMode ? " resumeProfileProjectListItem-dark" : " resumeProfileProjectListItem-light")
  const resumeProfileProjectBulletClass = "resumeProfileProjectListItem-bullets" + (darkMode ? " resumeProfileProjectListItem-bullets-dark" : " resumeProfileProjectListItem-bullets-light")

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
