import { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import './AboutModal.css'

const AboutModal = ({ user }) => {
  const [about, setAbout] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const aboutArray = user.about.split("\n")
    setAbout(aboutArray)
    setIsLoaded(true)
  }, [])

  const aboutModalClass = "aboutModal" + (darkMode ? " aboutModal-dark" : " aboutModal-light")

  return (
    <div className={aboutModalClass}>
      {isLoaded ? (
        <>
          <h1>About {user.firstName} {user.lastName}</h1>
          {about.map((element, i) => (
            <p key={i}>{element}</p>
          ))}
          <button>Edit About</button>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default AboutModal
