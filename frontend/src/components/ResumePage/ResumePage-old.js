import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import ResumeProjectListItem from '../ResumeProjectListItem'
import ResumeEmployerListItem from '../ResumeEmployerListItem'
import ResumeEducationListItem from '../ResumeEducationListItem'
import './ResumePage.css'

const ResumePage = ({ id }) => {
  const [resume, setResume] = useState({})
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const [socials, setSocials] = useState([])
  const [skills, setSkills] = useState('')
  const [projects, setProjects] = useState([])
  const [employers, setEmployers] = useState([])
  const [education, setEducation] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/${id}`)
      const resumeData = await res.json()

      const projectRes = await csrfFetch(`/api/users/${id}/projects`)
      const projectData = await projectRes.json()
      setProjects(projectData)

      const employerRes = await csrfFetch(`/api/resumes/employer/${id}`)
      const employerData = await employerRes.json()
      setEmployers(employerData)

      const educationRes = await csrfFetch(`/api/resumes/education/${id}`)
      const educationData = await educationRes.json()
      setEducation(educationData)

      const userPhone = resumeData.User.phone
      const areaCode = userPhone.slice(0, 3)
      const firstThree = userPhone.slice(3, 6)
      const lastFour = userPhone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

      const userSkills = resumeData.ResumeSkills

      const skillArray = []

      userSkills.forEach(el => {
        skillArray.push(el.skill)
      })

      setSkills(skillArray.join(", "))

      setResume(resumeData)
      setUser(resumeData.User)
      setSocials(resumeData.User.Socials)
      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [])

  const resumePageClass = "resumePage" + (darkMode ? " resumePage-dark" : " resumePage-light")
  const resumeClass = "resumePage-resume" + (darkMode ? " resumePage-resume-dark": " resumePage-resume-light")

  return (
    <div className={resumePageClass}>
      {isLoaded ? (
        <div className={resumeClass}>
          <div className='resumePage-resumeHeader'>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{resume.title}</p>
          </div>
          <div className='resumePage-line'/>
          <div className='resumePage-resumeContact'>
            <p>{phone}</p>
            <p>|</p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <p>|</p>
            <p>{user.location}</p>
            <p>|</p>
            <a href={user.portfolio} target='_blank' rel="noreferrer">Portfolio</a>
            {socials.map((social, i) => (
              <div className='socialDiv' key={i}>
                <p>|</p>
                <a href={social.link} target='_blank' rel="noreferrer">{social.name}</a>
              </div>
            ))}
          </div>
          <div className='resumePage-line'/>
          <div className='resumePage-resumeSkills'>
            <h2>TECHNICAL SKILLS</h2>
            <p>{skills}</p>
          </div>
          <div className='resumePage-line'/>
          <div className='resumePage-resumeProjects'>
            <h2>Projects</h2>
            {projects.map((project, i) => (
              <ResumeProjectListItem key={i} project={project} />
            ))}
          </div>
          <div className='resumePage-line'/>
          <div className='resumePage-resumeWork'>
            <h2>WORK EXPERIENCE</h2>
            {employers.map((employer, i) => (
              <ResumeEmployerListItem key={i} employer={employer}/>
            ))}
          </div>
          <div className='resumePage-line'/>
          <div className='resumePage-resumeEducation'>
            <h2>EDUCATION</h2>
            {education.map((edu, i) => (
              <ResumeEducationListItem key={i} edu={edu}/>
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

export default ResumePage
