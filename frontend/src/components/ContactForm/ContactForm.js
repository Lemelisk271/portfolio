import { useContext, useRef, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import emailjs from '@emailjs/browser'
import './ContactForm.css'

const ContactForm = () => {
  const form = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)

  // eslint-disable-next-line
  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  useEffect(() => {
    const errors = {}

    if (name.length === 0) {
      errors.name = "Please enter your name"
    }

    if (!emailReg.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (message.length === 0) {
      errors.message = "Please enter a message"
    }

    setValidationErrors(errors)
    // eslint-disable-next-line
  }, [name, email, message])

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    emailjs.sendForm('service_upieoze', 'template_wbocc9e', form.current, '17ns15ZdA3E6fuMG8')
      .then((result) => {
        setName('')
        setEmail('')
        setMessage('')
        setIsSubmitted(false)
        setIsSent(true)
      }, (error) => {
        console.log(error.text)
      })
  }

  const contactFormClass = "contactForm" + (darkMode ? " contactForm-dark" : " contactForm-light")

  return (
    <div className={contactFormClass}>
      {isSent ? (
        <>
          <h2>Your Message Has Been Sent</h2>
          <p>I will get back to you as soon as I can.</p>
        </>
      ):(
        <>
          <h2>Send me a Message</h2>
          {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
              {Object.values(validationErrors).map((error, i) => (
                <li key={i} className='error'>{error}</li>
              ))}
            </ul>}
          <form ref={form} onSubmit={sendEmail}>
            <div>
              <label htmlFor='name'>Your Name</label>
              <input
                id='name'
                type='text'
                name='user_name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>Your Email</label>
              <input
                id='email'
                type='email'
                name='user_email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                name='message'
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={10}
              />
            </div>
            <button type='submit'>Send</button>
          </form>
        </>
      )}
    </div>
  )
}

export default ContactForm
