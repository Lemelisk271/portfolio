import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { DarkModeContext } from '../../context/DarkModeContext'

const ResumeProfilePage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const { darkMode } = useContext(DarkModeContext)

  const resumeProfileClass = "resumeProfilePage" + (darkMode ? " resumeProfilePage-dark" : " resumeProfilePage-light")

  return (
    <div className={resumeProfileClass}>
      <h1>{sessionUser.firstName} {sessionUser.lastName}'s Resume</h1>
    </div>
  )
}

export default ResumeProfilePage
