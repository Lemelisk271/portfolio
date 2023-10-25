import { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import { ResetContext } from '../../context/ResetContext'
import EditResumeTitleModal from '../EditResumeTitleModal'
import OpenModalButton from '../OpenModalButton'
import ResumeSkillListItem from '../ResumeSkillListItem'
import ResumeSkillForm from '../ResumeSkillForm'
import ResumeProfileProjectListItem from '../ResumeProfileProjectListItem'
import ResumeProfileEmployerListItem from '../ResumeProfileEmployerListItem'
import './ResumeProfilePage.css'

const ResumeProfilePage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [resume, setResume] = useState({})
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [employers, setEmployers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)
  const { reset } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/${sessionUser.id}`)
      const resumeData = await res.json()
      setResume(resumeData)
      setSkills(resumeData.ResumeSkills)

      const projectRes = await csrfFetch(`/api/users/${resumeData.User.id}/projects`)
      const projectData = await projectRes.json()
      setProjects(projectData)

      const employerRes = await csrfFetch(`/api/resumes/employer/${sessionUser.id}`)
      const employerData = await employerRes.json()
      setEmployers(employerData)
      console.log(employerData)

      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [reset])

  if (!sessionUser) return <Redirect to="/"/>

  const resumeProfileClass = "resumeProfilePage" + (darkMode ? " resumeProfilePage-dark" : " resumeProfilePage-light")
  const resumeProfileContentClass = "resumeProfilePage-content" + (darkMode ? " resumeProfilePage-content-dark" : " resumeProfilePage-content-light")
  const resumeTitleClass = "resumeProfilePage-title" + (darkMode ? " resumeProfilePage-title-dark" : " resumeProfilePage-title-light")
  const resumeSkillClass = "resumeProfilePage-skills" + (darkMode ? " resumeProfilePage-skills-dark" : " resumeProfilePage-skills-light")
  const addSkillButtonClass = "resumeProfilePage-addSkillButton" + (darkMode ? " resumeProfilePage-addSkillButton-dark" : " resumeProfilePage-addSkillButton-light")
  const projectBulletClass = "resumeProfilePage-projectBullets" + (darkMode ? " resumeProfilePage-projectBullets-dark" : " resumeProfilePage-projectBullets-light")
  const employerClass = "resumeProfilePage-employers" + (darkMode ? " resumeProfilePage-employers-dark" : " resumeProfilePage-employers-light")

  return (
    <div className={resumeProfileClass}>
      {isLoaded ? (
        <div className={resumeProfileContentClass}>
          <h1>{sessionUser.firstName} {sessionUser.lastName}'s Resume</h1>
          <div className={resumeTitleClass}>
            <div>
              <h2>Title: {resume.title}</h2>
              <h2>Role: {resume.role}</h2>
            </div>
            <OpenModalButton
              buttonText="Edit Title/Role"
              modalComponent={<EditResumeTitleModal user={sessionUser} resume={resume}/>}
            />
          </div>
          <h2>Skills</h2>
          <div className={resumeSkillClass}>
            {skills.map((skill, i) => (
              <ResumeSkillListItem key={i} skill={skill}/>
            ))}
          </div>
          <div className={addSkillButtonClass}>
            <OpenModalButton
              buttonText="Add Skill"
              modalComponent={<ResumeSkillForm resumeId={resume.id} page="new" />}
            />
          </div>
          <h2>Project Bullets</h2>
          <div className={projectBulletClass}>
            {projects.map((project, i) => (
              <ResumeProfileProjectListItem key={i} project={project} />
            ))}
          </div>
          <h2>Experience</h2>
          <div className={employerClass}>
            {employers.map((employer, i) => (
              <ResumeProfileEmployerListItem key={i} employer={employer} />
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

export default ResumeProfilePage
