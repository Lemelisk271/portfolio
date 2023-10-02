import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import EditProfileModal from '../EditProfileModal'
import OpenModalButton from '../OpenModalButton'
import ChangePasswordModal from '../ChangePasswordModal'
import ChangeUserImageModal from '../ChangeUserImageModal'
import AboutModal from '../AboutModal'
import ProfileProjectListItem from '../ProfileProjectListItem'
import ProfileSkillListItem from '../ProfileSkillListItem'
import { ResetContext } from '../../context/ResetContext'
import './ProfilePage.css'

const ProfilePage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const { darkMode } = useContext(DarkModeContext)
  const { reset } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch('/api/users')
      const userData = await res.json()
      setUser(userData)

      const areaCode = userData.phone.slice(0, 3)
      const firstThree = userData.phone.slice(3, 6)
      const lastFour = userData.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

      const projectRes = await csrfFetch(`/api/users/${sessionUser.id}/projects`)
      const projectData = await projectRes.json()
      setProjects(projectData)

      const skillRes = await csrfFetch(`/api/users/${sessionUser.id}/skills`)
      const skillData = await skillRes.json()
      setSkills(skillData)

      setIsLoaded(true)
    }
    loadPage()
  }, [sessionUser, reset])

  if (!sessionUser) return <Redirect to="/"/>

  const profilePageClass = "profilePage" + (darkMode ? " profilePage-dark" : " profilePage-light")
  const profileInfoClass = "profilePage-info" + (darkMode ? " profilePage-info-dark" : " profilePage-info-light")
  const profileUserClass = "profilePage-user" + (darkMode ? " profilePage-user-dark" : " profilePage-user-light")
  const profileUserButtonClass = "profilePage-userButtons" + (darkMode ? " profilePage-userButtons-dark" : " profilePage-userButtons-light")
  const profileProjectsClass = "profilePage-projects" + (darkMode ? " profilePage-projects-dark" : " profilePage-projects-light")
  const profileSkillClass = "profilePage-skills" + (darkMode ? " profilePage-skills-dark" : " profilePage-skills-light")

  return (
    <div className={profilePageClass}>
      {isLoaded ? (
        <div className='profilePage-content'>
          <h1>{sessionUser.firstName} {sessionUser.lastName}'s Profile</h1>
          <h2>User Information</h2>
          <div className={profileInfoClass}>
            <div className={profileUserClass}>
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
                <OpenModalButton
                  buttonText="Change Profile Image"
                  modalComponent={<ChangeUserImageModal user={user} />}
                />
              </div>
            </div>
          </div>
          <div className={profileProjectsClass}>
            <h2>Projects</h2>
            {projects.map((project, i) => (
              <ProfileProjectListItem key={i} project={project} />
            ))}
          </div>
          <h2>Skills</h2>
          <div className={profileSkillClass}>
            {skills.map((skill, i) => (
              <ProfileSkillListItem key={i} skill={skill} />
            ))}
          </div>
        </div>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default ProfilePage
