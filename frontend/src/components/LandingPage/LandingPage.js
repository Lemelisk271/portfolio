import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import { PageContext } from '../../context/PageContext'
import AboutPage from '../AboutPage'
import ContactPage from '../ContactPage'
import ProjectPage from '../ProjectPage'
import './LandingPage.css'

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const { darkMode } = useContext(DarkModeContext)
  const { page, setPage } = useContext(PageContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch('/api/users')
      const userData = await res.json()
      setUser(userData)

      const areaCode = userData.phone.slice(0, 3)
      const firstThree = userData.phone.slice(3, 6)
      const lastFour = userData.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const userSelectClass = "landingPage-userSelect" + (darkMode ? " landingPage-userSelect-dark" : " landingPage-userSelect-light")
  const userClass = "landingPage-user" + (darkMode ? " landingPage-user-dark" : " landingPage-user-light")
  const selectClass = "landingPage-select" + (darkMode ? " landingPage-select-dark" : " landingPage-select-light")
  const landingPageContent = "landingPage-content" + (darkMode ? " landingPage-content-dark" : " landingPage-content-light")

  let pageContent

  if (page === 'about') {
    pageContent = (
      <AboutPage user={user} />
    )
  } else if (page === 'projects') {
    pageContent = (
      <ProjectPage />
    )
  } else {
    pageContent = (
      <ContactPage />
    )
  }

  const aboutButton = (e) => {
    e.preventDefault()
    setPage('about')
  }

  const projectButton = (e) => {
    e.preventDefault()
    setPage('projects')
  }

  const contactButton = (e) => {
    e.preventDefault()
    setPage('contact')
  }

  return (
    <>
      {isLoaded ? (
        <div className="landingPage">
          <div className={userSelectClass}>
            <div className={userClass}>
              <img src={user.profileImage} alt={user.firstName}/>
              <h3>{user.firstName} {user.lastName}</h3>
              <p>{user.location}</p>
              <a href={`mailto:${user.email}`}>zwsmith27@gmail.com</a>
              <p>{phone}</p>
            </div>
            <div className={selectClass}>
              <button onClick={aboutButton}>About Me</button>
              <button onClick={projectButton}>Projects</button>
              <button onClick={contactButton}>Contact Me</button>
            </div>
          </div>
          <div className={landingPageContent}>
            {pageContent}
          </div>
        </div>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </>
  )
}

export default LandingPage
