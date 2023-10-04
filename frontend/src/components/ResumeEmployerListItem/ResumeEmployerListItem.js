import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'

const ResumeEmployerListItem = ({ employer }) => {
  const [employerBullets, setEmployerBullets] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  console.log(employer)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/employerbullet/${employer.id}`)
      const bulletData = await res.json()
      setEmployerBullets(bulletData)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const resumeEmployerClass = "resumeEmployerListItem" + (darkMode ? " resumeEmployerListItem-dark" : " resumeEmployerListItem-light")

  return (
    <div className={resumeEmployerClass}>
      {isLoaded ? (
        <>
          <div className="resumeEmployerListItem-header">
            <div className="resumeEmployerListItem-headerInfo">
              <h3>{employer.position}</h3>
              <p>{employer.company}, {employer.location}</p>
            </div>
            <div className="resumeEmployerListItem-headerDates">
              <p>{employer.startDate} - {employer.endDate}</p>
            </div>
          </div>
          <div className='resumeEmployerListItem'>
            <ul>
              {employerBullets.map((bullet, i) => (
                <li key={i}>{bullet.bullet}</li>
              ))}
            </ul>
          </div>
        </>
      ):(
        <>
          <h2>Loading...</h2>
        </>
      )}
    </div>
  )
}

export default ResumeEmployerListItem
