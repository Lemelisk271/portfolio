import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import './ResumeEducationListItem.css'

const ResumeEducationListItem = ({ edu }) => {
  const { darkMode } = useContext(DarkModeContext)

  console.log(edu)

  const resumeEducationClass = "resumeEducationListItem" + (darkMode ? " resumeEducationListItem-dark" : " resumeEducationListItem-light")

  return (
    <div className={resumeEducationClass}>
      <div className='resumeEducationListItem-degree'>
        <p>{edu.degree}</p>
      </div>
      <div className='resumeEducationListItem-school'>
        <p>{edu.school} - {edu.year}</p>
      </div>
    </div>
  )
}

export default ResumeEducationListItem
