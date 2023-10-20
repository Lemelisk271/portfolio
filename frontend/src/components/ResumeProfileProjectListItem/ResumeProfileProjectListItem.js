import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import ResumeProfileProjectBullets from '../ResumeProfileProjectBullets'

const ResumeProfileProjectListItem = ({ project }) => {
  const [bullets, setBullets] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  console.log(project)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/projectBullets/${project.id}`)
      const bulletData = await res.json()
      setBullets(bulletData)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const resumeProfileProjectClass = "resumeProfileProjectListItem" + (darkMode ? " resumeProfileProjectListItem-dark" : " resumeProfileProjectListItem-light")
  const resumeProfileProjectBulletClass = "resumeProfileProjectListItem-bullets" + (darkMode ? " resumeProfileProjectListItem-bullets-dark" : " resumeProfileProjectListItem-bullets-light")

  return (
    <div className={resumeProfileProjectClass}>
      {isLoaded ? (
        <>
          <p>{project.name}</p>
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
