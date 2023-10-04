import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import './ResumePage.css'

const ResumePage = ({ id }) => {
  const [resume, setResume] = useState({})
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const [socials, setSocials] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/resumes/${id}`)
      const resumeData = await res.json()

      const userPhone = resumeData.User.phone
      const areaCode = userPhone.slice(0, 3)
      const firstThree = userPhone.slice(3, 6)
      const lastFour = userPhone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

      setResume(resumeData)
      setUser(resumeData.User)
      setSocials(resumeData.User.Socials)
      console.log(resumeData)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const resumePageClass = "resumePage" + (darkMode ? " resumePage-dark" : " resumePage-light")

  return (
    <div className={resumePageClass}>
      {isLoaded ? (
        <div className='resumePage-resume'>
          <div className='resumePage-resumeHeader'>
            <h1>{user.firstName} {user.lastName}</h1>
            <h3>{resume.title}</h3>
          </div>
          <div className='resumePage-resumeContact'>
            <p>{phone}</p>
            <p>{user.email}</p>
            <p>{user.location}</p>
            <a href={user.portfolio} target='_blank' rel="noreferrer">Portfolio</a>
            {socials.map((social, i) => (
              <a href={social.link} target='_blank' rel="noreferrer">{social.name}</a>
            ))}
          </div>
          <div className='resumePage-resumeSkills'>
            <h2>TECHNICAL SKILLS</h2>
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
