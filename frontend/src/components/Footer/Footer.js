import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import './Footer.css'

const Footer = () => {
  const [year, setYear] = useState('10191')
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const today = new Date()
    const currentYear = today.getFullYear()
    setYear(currentYear)
  }, [])

  const footerClass = 'footer' + (darkMode ? " footer-dark" : " footer-light")

  return (
    <div className={footerClass}>
      <p>&copy; {year} - Zach Smith</p>
    </div>
  )
}

export default Footer
