import { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import { ResetContext } from '../../context/ResetContext'
import EditResumeTitleModal from '../EditResumeTitleModal'
import OpenModalButton from '../OpenModalButton'

const ResumeProfilePage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [resume, setResume] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/${sessionUser.id}`)
      const resumeData = await res.json()
      setResume(resumeData)

      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [reset])

  const resumeProfileClass = "resumeProfilePage" + (darkMode ? " resumeProfilePage-dark" : " resumeProfilePage-light")

  return (
    <div className={resumeProfileClass}>
      {isLoaded ? (
        <>
          <h1>{sessionUser.firstName} {sessionUser.lastName}'s Resume</h1>
          <div className='resumeProfilePage-title'>
            <h2>Title: {resume.title}</h2>
            <OpenModalButton
              buttonText="Edit Title"
              modalComponent={<EditResumeTitleModal user={sessionUser} resume={resume}/>}
            />
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

export default ResumeProfilePage
