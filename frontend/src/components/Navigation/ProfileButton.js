import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/session'
import { DarkModeContext } from '../../context/DarkModeContext'

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const ulRef = useRef()

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoutButton = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden")
  const profileButtonClass = "profileButton" + (darkMode ? " profileButton-dark" : " profileButton-light")
  const profileLineClass = "profileButton-line" + (darkMode ? " profileButton-line-dark" : " profileButton-line-light")

  return (
    <div className={profileButtonClass}>
      <button onClick={openMenu}>
        <i className="fa-solid fa-circle-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <div className={profileLineClass}/>
        <li><Link to='/profile'>My Profile</Link></li>
        <li><Link to='/resume'>My Resume</Link></li>
        <div className={profileLineClass}/>
        <li>
          <button onClick={logoutButton}>Log Out</button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileButton
