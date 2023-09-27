import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'

const ContactPage = ({ user }) => {
  const [phone, setPhone] = useState("")
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const areaCode = user.phone.slice(0, 3)
      const firstThree = user.phone.slice(3, 6)
      const lastFour = user.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)
    }
    loadPage()
  }, [])

  const contactPageEmail = "contactPage-email" + (darkMode ? " contactPage-email-dark" : " contactPage-email-light")
  const contactPagePhone = "contactPage-phone" + (darkMode ? " contactPage-phone-dark" : " contactPage-phone-light")

  return (
    <div className='contactPage'>
      <h1>Contact {user.firstName}</h1>
      <div className={contactPageEmail}>
        <h2>Email:</h2>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
      <div className={contactPagePhone}>
        <h2>Phone:</h2>
        {phone}
      </div>
    </div>
  )
}

export default ContactPage
