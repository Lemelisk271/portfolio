import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import './ResumeEducationListItem.css'

const ResumeEducationListItem = ({ edu }) => {
  const { darkMode } = useContext(DarkModeContext)

  const resumeEducationClass = "resumeEducationListItem" + (darkMode ? " resumeEducationListItem-dark" : " resumeEducationListItem-light")

  return (
    <div className={resumeEducationClass}>
      <div className='resumeEducationListItem-degree'>
        <p><strong>{edu.school},</strong> <em>{edu.degree}</em></p>
      </div>
      <div className='resumeEducationListItem-school'>
        <p>{edu.year}</p>
      </div>
    </div>
  )
}

export default ResumeEducationListItem
