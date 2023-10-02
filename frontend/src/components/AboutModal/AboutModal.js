import { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import EditAboutModal from '../EditAboutModal'
import OpenModalButton from '../OpenModalButton'
import './AboutModal.css'

const AboutModal = ({ user }) => {
  const [about, setAbout] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const aboutArray = user.about.split("\n")
    setAbout(aboutArray)
    setIsLoaded(true)
    // eslint-disable-next-line
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
          <OpenModalButton
            buttonText="Edit About"
            modalComponent={<EditAboutModal user={user}/>}
          />
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
