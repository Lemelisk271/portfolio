import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'

const EmployerForm = ({ employer, page }) => {
  const [title, setTitle] = useState('')
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    if (page === 'edit') {
      setTitle(`Edit ${employer.company}`)
    } else {
      setTitle('Add Employer')
    }
  }, [])

  const employerFormClass = "employerForm" + (darkMode ? " employerForm-dark" : " employerForm-light")

  return (
    <div className={employerFormClass}>
      <h1>{title}</h1>
    </div>
  )
}

export default EmployerForm
