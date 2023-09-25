import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks

  if(sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    )
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText={'Log In'}
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText={'Sign up'}
          modalComponent={<SignupFormModal />}
        />
      </li>
    )
  }

  return (
    <>
      <ul className='nav-links'>
        <li><NavLink exact to='/'>Home</NavLink></li>
        {isLoaded && sessionLinks}
      </ul>
    </>
  )
}

export default Navigation
