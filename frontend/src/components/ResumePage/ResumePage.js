import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'

const ResumePage = ({ userId }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [resume, setResume] = useState({})
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const [socials, setSocials] = useState([])
  const [frontendSkills, setFrontendSkills] = useState('')
  const [backendSkills, setBackendSkills] = useState('')
  const [expertiseSkills, setExpertiseSkills] = useState('')
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
              <p>|</p>
              <p>{phone}</p>
              <p>|</p>
              <a href={`mailto:${user.email}`}>{user.email}</a>
              <p>|</p>
              {socials.map((social, i) => (
                <div className='socialDiv' key={i}>
                  <a href={social.link} target='_blank' rel="noreferrer">{social.name}</a>
                  <p>|</p>
                </div>
              ))}
              <a href={user.portfolio} target='_blank' rel='noreferrer'>Portfolio</a>
            </div>
            <div className='resumePage-resumeSkills'>
              <h2>TECHNICAL SKILLS</h2>
              <table>
                <tbody>
                  <tr>
                    <th scope='row'>Frontend:</th>
                    <td>{frontendSkills}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Backend:</th>
                    <td>{backendSkills}</td>
                  </tr>
                  <tr>
                    <th scope='row'>Expertise:</th>
                    <td>{expertiseSkills}</td>
                  </tr>
                </tbody>
              </table>
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
