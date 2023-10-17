import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import ResumeProjectListItem from '../ResumeProjectListItem'
import ResumeEmployerListItem from '../ResumeEmployerListItem'
import ResumeEducationListItem from '../ResumeEducationListItem'
import './ResumePage.css'

const ResumePage = ({ userId }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [resume, setResume] = useState({})
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const [socials, setSocials] = useState([])
  const [frontendSkills, setFrontendSkills] = useState('')
  const [backendSkills, setBackendSkills] = useState('')
  const [expertiseSkills, setExpertiseSkills] = useState('')
  const [projects, setProjects] = useState([])
  const [employers, setEmployers] = useState([])
  const [education, setEducation] = useState([])
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const resumeRes = await csrfFetch(`/api/resumes/${userId}`)
      const resumeData = await resumeRes.json()
      setResume(resumeData)
      setUser(resumeData.User)
      setSocials(resumeData.User.Socials)
      console.log(resumeData)

      const rawPhone = resumeData.User.phone
      const areaCode = rawPhone.slice(0, 3)
      const firstThree = rawPhone.slice(3, 6)
      const lastFour = rawPhone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

      const rawSkills = resumeData.ResumeSkills
      const rawFront = rawSkills.filter(skill => skill.category === 'frontend')
      const frontArray = []
      rawFront.forEach(el => {
        frontArray.push(el.skill)
      })
      setFrontendSkills(frontArray.join(", "))
      const rawBack = rawSkills.filter(skill => skill.category === 'backend')
      const backArray = []
      rawBack.forEach(el => {
        backArray.push(el.skill)
      })
      setBackendSkills(backArray.join(", "))
      const rawExpertise = rawSkills.filter(skill => skill.category === 'expertise')
      const expertiseArray = []
      rawExpertise.forEach(el => {
        expertiseArray.push(el.skill)
      })
      setExpertiseSkills(expertiseArray.join(", "))

      const projectRes = await csrfFetch(`/api/users/${userId}/projects`)
      const projectData = await projectRes.json()
      setProjects(projectData)

      const employerRes = await csrfFetch(`/api/resumes/employer/${userId}`)
      const employerData = await employerRes.json()
      setEmployers(employerData)

      const educationRes = await csrfFetch(`/api/resumes/education/${userId}`)
      const educationData = await educationRes.json()
      setEducation(educationData)

      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const resumePageClass = "resumePage" + (darkMode ? " resumePage-dark" : " resumePage-light")
  const resumeClass = "resumePage-resume" + (darkMode ? " resumePage-resume-dark": " resumePage-resume-light")

  return (
    <div className={resumePageClass}>
      {isLoaded ? (
        <>
          <div className={resumeClass}>
            <div className='resumePage-resumeHeader'>
              <h1>{user.firstName} {user.lastName}</h1>
              <p>{resume.role} | {resume.title}</p>
            </div>
            <div className='resumePage-resumeContact'>
              <p>{user.location}</p>
              <p>{phone}</p>
              <a href={`mailto:${user.email}`}>{user.email}</a>
              <a href={user.portfolio} target='_blank' rel='noreferrer'>Portfolio</a>
              {socials.map((social, i) => (
                <div className='socialDiv' key={i}>
                  <a href={social.link} target='_blank' rel="noreferrer">{social.name}</a>
                </div>
              ))}
            </div>
            <div className='resumePage-resumeSkills'>
              <h2>TECHNICAL SKILLS</h2>
              <div className='resumePage-line'/>
              <p><strong>Frontend:</strong> {frontendSkills}</p>
              <p><strong>Backend:</strong> {backendSkills}</p>
              <p><strong>Expertise:</strong> {expertiseSkills}</p>
            </div>
            <div className='resumePage-resumeProjects'>
              <h2>PROJECTS</h2>
              <div className='resumePage-line'/>
              {projects.map((project, i) => (
                <ResumeProjectListItem key={i} project={project} />
              ))}
            </div>
            <div className='resumePage-resumeWork'>
              <h2>EXPERIENCE</h2>
              <div className='resumePage-line'/>
              {employers.map((employer, i) => (
                <ResumeEmployerListItem key={i} employer={employer} />
              ))}
            </div>
            <div className='resumePage-resumeEducation'>
              <h2>EDUCATION</h2>
              <div className='resumePage-line'/>
              {education.map((edu, i) => (
                <ResumeEducationListItem key={i} edu={edu} />
              ))}
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

export default ResumePage
