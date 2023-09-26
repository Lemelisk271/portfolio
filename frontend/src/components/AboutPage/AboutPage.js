import { useState, useEffect } from 'react'

const AboutPage = ({ user }) => {
  const [about, setAbout] = useState([])

  useEffect(() => {
    const aboutArray = user.about.split("\n")
    setAbout(aboutArray)
  }, [])

  return (
    <div className='aboutPage'>
      <h1>About {user.firstName} {user.lastName}</h1>
      {about.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )
}

export default AboutPage
