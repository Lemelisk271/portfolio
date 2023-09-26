import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import { DarkModeContext } from '../../context/DarkModeContext'
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [darkButton, setDarkButton] = useState('')
  const { darkMode, setDarkMode } = useContext(DarkModeContext)

  useEffect(() => {
    if (darkMode) {
      setDarkButton("Dark Mode: On")
    } else {
      setDarkButton("Dark Mode: Off")
    }
  }, [darkMode])

  const darkModeButton = (e) => {
    e.preventDefault()
    setDarkMode(!darkMode)
  }

  let sessionLinks

  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser}/>
      </li>
    )
  } else {
    sessionLinks = (
      <>
        <button onClick={darkModeButton}>{darkButton}</button>
      </>
    )
  }

  const navClass = darkMode ? 'navigation-dark' : 'navigation-light'

  return (
    <div className={navClass}>
      <h1>Zach Smith, Software Developer</h1>
      {isLoaded && sessionLinks}
    </div>
  )
}

export default Navigation
