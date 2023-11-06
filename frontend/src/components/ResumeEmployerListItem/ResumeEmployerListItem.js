import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import { csrfFetch } from '../../store/csrf'
import './ResumeEmployerListItem.css'

const ResumeEmployerListItem = ({ employer }) => {
  const [employerBullets, setEmployerBullets] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/employerbullet/${employer.id}`)
      const bulletData = await res.json()
      setEmployerBullets(bulletData)
      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [])

  const resumeEmployerClass = "resumeEmployerListItem" + (darkMode ? " resumeEmployerListItem-dark" : " resumeEmployerListItem-light")

  return (
    <div className={resumeEmployerClass}>
      {isLoaded ? (
        <>
          <div className="resumeEmployerListItem-header">
            <div className="resumeEmployerListItem-headerInfo">
              <p>{employer.position}</p>
              <p><strong><em>{employer.company}, {employer.location}</em></strong></p>
            </div>
            <div className="resumeEmployerListItem-headerDates">
              {employer.current ? (
                <>
                  <p>{employer.startDate} - Present</p>
                </>
              ):(
                <>
                  <p>{employer.startDate} - {employer.endDate}</p>
                </>
              )}
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
