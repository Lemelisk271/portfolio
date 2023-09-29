import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import EditProfileModal from '../EditProfileModal'
import OpenModalButton from '../OpenModalButton'
import ChangePasswordModal from '../ChangePasswordModal'
import AboutModal from '../AboutModal'
import './ProfilePage.css'

const ProfilePage = () => {
  const sessionUser = useSelector(state => state.session.user)
  console.log(sessionUser)
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const { darkMode } = useContext(DarkModeContext)

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
  }, [sessionUser])

  if (!sessionUser) return <Redirect to="/"/>

  const profileInfoClass = "profilePage-info" + (darkMode ? " profilePage-info-dark" : " profilePage-info-light")
  const profileUserClass = "profilePage-user" + (darkMode ? " profilePage-user-dark" : " profilePage-user-light")
  const profileUserButtonClass = "profilePage-userButtons" + (darkMode ? " profilePage-userButtons-dark" : " profilePage-userButtons-light")

  return (
    <div className="profilePage">
      {isLoaded ? (
        <>
          <h1>{sessionUser.firstName} {sessionUser.lastName}'s Profile</h1>
          <div className={profileInfoClass}>
            <div className={profileUserClass}>
              <h2>User Information</h2>
              <img src={user.profileImage} alt={user.firstName}/>
              <table>
                <tbody>
                  <tr>
                    <th scope='row'>First Name:</th>
                    <td>{user.firstName}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Last Name:</th>
                    <td>{user.lastName}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Username:</th>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Phone:</th>
                    <td>{phone}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Location:</th>
                    <td>{user.location}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Profile Image URL:</th>
                    <td>{user.profileImage}</td>
                  </tr>
                </tbody>
              </table>
              <div className={profileUserButtonClass}>
                <OpenModalButton
                  buttonText="Edit Profile"
                  modalComponent={<EditProfileModal user={user}/>}
                />
                <OpenModalButton
                  buttonText="View/Edit About"
                  modalComponent={<AboutModal user={user}/>}
                />
                <OpenModalButton
                  buttonText="Change Password"
                  modalComponent={<ChangePasswordModal user={user}/>}
                />
              </div>
            </div>
          </div>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default ProfilePage
