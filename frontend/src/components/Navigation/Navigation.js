import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import { DarkModeContext } from '../../context/DarkModeContext'
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user)
  const { darkMode, setDarkMode } = useContext(DarkModeContext)
  const [darkButton, setDarkButton] = useState('')

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

  return (
    <div className='navigation'>
      {isLoaded && sessionLinks}
    </div>
  )
}

export default Navigation
