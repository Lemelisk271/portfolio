import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import SignUpFormModal from '../SignUpFormModal'
import './Navigation.css'

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks

  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser}/>
      </li>
    )
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignUpFormModal />}
        />
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
