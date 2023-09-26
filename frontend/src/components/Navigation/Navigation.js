import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/session'
import ProfileButton from './ProfileButton'

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  const logoutButton = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  let sessionLinks

  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser}/>
        <button onClick={logoutButton}>Log Out</button>
      </li>
    )
  } else {
    sessionLinks = (
      <li>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    )
  }

  return (
    <div className='navigation'>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  )
}

export default Navigation
