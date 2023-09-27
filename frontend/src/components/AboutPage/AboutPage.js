import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import './AboutPage.css'

const AboutPage = ({ user }) => {
  const [about, setAbout] = useState([])
  const [skills, setSkills] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/users/${user.id}/skills`)
      const skillData = await res.json()
      setSkills(skillData)
      console.log(skillData)
      const aboutArray = user.about.split("\n")
      setAbout(aboutArray)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const aboutSectionClass = "aboutPage-about" + (darkMode ? " aboutPage-about-dark" : " aboutPage-about-light")
  const aboutSkillClass = "aboutPage-skillItem" + (darkMode ? " aboutPage-skillItem-dark" : " aboutPage-skillItem-light")

  return (
    <>
      {isLoaded ? (
        <>
          <div className='aboutPage'>
            <div className={aboutSectionClass}>
              <h1>About {user.firstName} {user.lastName}</h1>
              {about.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <h2>Some of my Skills:</h2>
            <div className='aboutPage-skills'>
              {skills.map((skill, i) => (
                <div className={aboutSkillClass} key={i}>
                  <img src={skill.icon} alt={skill}/>
                  <h3>{skill.skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </>
  )
}

export default AboutPage
