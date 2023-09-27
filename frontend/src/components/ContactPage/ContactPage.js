import { useContext, useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import './ContactPage.css'

const ContactPage = ({ user }) => {
  const [phone, setPhone] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [socials, setSocials] = useState([])
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/users/${user.id}/socials`)
      const socialsData = await res.json()
      setSocials(socialsData)
      console.log(socialsData)

      const areaCode = user.phone.slice(0, 3)
      const firstThree = user.phone.slice(3, 6)
      const lastFour = user.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)
      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [])

  const contactPageEmail = "contactPage-email" + (darkMode ? " contactPage-email-dark" : " contactPage-email-light")
  const contactPagePhone = "contactPage-phone" + (darkMode ? " contactPage-phone-dark" : " contactPage-phone-light")
  const contactPageSocial = "contactPage-social" + (darkMode ? " contactPage-social-dark" : " contactPage-social-light")

  return (
    <div className='contactPage'>
      {isLoaded ? (
        <>
          <h1>Contact {user.firstName}</h1>
          <div className={contactPageEmail}>
            <h2>Email:</h2>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
          <div className={contactPagePhone}>
            <h2>Phone:</h2>
            <p>{phone}</p>
          </div>
          <h2>Social Media:</h2>
          <div className={contactPageSocial}>
            {socials.map((social, i) => (
              <a key={i} href={social.link} target='_blank' rel="noreferrer"><i className={social.icon}></i></a>
            ))}
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

export default ContactPage
