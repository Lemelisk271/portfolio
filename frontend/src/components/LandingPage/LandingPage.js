import { useState, useEffect, useContext } from 'react'
import { csrfFetch } from '../../store/csrf'
import { DarkModeContext } from '../../context/DarkModeContext'
import './LandingPage.css'

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})
  const [phone, setPhone] = useState('')
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch('/api/users')
      const userData = await res.json()
      setUser(userData)

      const areaCode = userData.phone.slice(0, 3)
      const firstThree = userData.phone.slice(3, 6)
      const lastFour = userData.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

      console.log(userData)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const userSelectClass = "landingPage-userSelect" + (darkMode ? " landingPage-userSelect-dark" : " landingPage-userSelect-light")
  const userClass = "landingPage-user" + (darkMode ? " landingPage-user-dark" : " landingPage-user-light")
  const selectClass = "landingPage-select" + (darkMode ? " landingPage-select-dark" : " landingPage-select-light")

  return (
    <>
      {isLoaded ? (
        <div className="landingPage">
          <div className={userSelectClass}>
            <div className={userClass}>
              <img src={user.profileImage} alt={user.firstName}/>
              <h3>{user.firstName} {user.lastName}</h3>
              <p>{user.location}</p>
              <p>{user.email}</p>
              <p>{phone}</p>
            </div>
            <div className={selectClass}>
              <button>About Me</button>
              <button>Projects</button>
              <button>Contact Me</button>
            </div>
          </div>
          <div className='landingPage-content'>
            <h1>Content</h1>
          </div>
        </div>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </>
  )
}

export default LandingPage
