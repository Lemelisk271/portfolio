import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import { DarkModeContext } from '../../context/DarkModeContext'
import { UltraDarkModeContext } from '../../context/UltraDarkContext'
import { csrfFetch } from '../../store/csrf'
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [darkButton, setDarkButton] = useState('')
  const [user, setUser] = useState({})
  const { darkMode, setDarkMode } = useContext(DarkModeContext)
  const { ultraDarkMode, setUltraDarkMode } = useContext(UltraDarkModeContext)

  useEffect(() => {
    const loadUser = async () => {
      const res = await csrfFetch('/api/users')
      const userData = await res.json()
      setUser(userData)
    }
    loadUser()
  }, [sessionUser])

  useEffect(() => {
    if (darkMode) {
      setDarkButton("Dark Mode: On")
    } else {
      setDarkButton("Dark Mode: Off")
    }
  }, [darkMode])

  const darkModeButton = (e) => {
    e.preventDefault()
    let newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("darkMode", newMode)
  }

  const ultraDarkButton = (e) => {
    e.preventDefault()
    setUltraDarkMode(!ultraDarkMode)
  }

  let sessionLinks

  if (sessionUser) {
    sessionLinks = (
      <>
        <button onClick={darkModeButton}>{darkButton}</button>
        <ProfileButton user={sessionUser}/>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <button onClick={darkModeButton}>{darkButton}</button>
        <button onClick={ultraDarkButton}>Ultra Dark Mode: Off</button>
      </>
    )
  }

  const navClass = "navigation" + (darkMode ? ' navigation-dark' : ' navigation-light')

  return (
    <div className={navClass}>
      <a href='/'><h1>{user.firstName} {user.lastName}, Software Developer</h1></a>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  )
}

export default Navigation
