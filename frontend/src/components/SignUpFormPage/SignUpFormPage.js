import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../store/session'

const SignUpFormPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  useEffect(() => {
    const errors = {}

    if (!emailReg.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (emailReg.test(username)) {
      errors.usernameEmail = "Your username cannot be an email address"
    }

    if (username.length < 4) {
      errors.usernameMin = "Your username needs to be more than 4 characters"
    }

    if (username.length > 30) {
      errors.usernameMax = "Your username needs to be less then 30 characters"
    }

    if (firstName.length === 0) {
      errors.firstName = "Please enter your first name"
    }

    if (lastName.length === 0) {
      errors.lastName = "Please enter your last name"
    }

    if (password.length === 0) {
      errors.password = "Please enter a password"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password must match"
    }

    setValidationErrors(errors)
  }, [email, username, firstName, lastName, password, confirmPassword])

  if (sessionUser) return <Redirect to='/' />

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const signupObj = {
      email,
      username,
      firstName,
      lastName,
      password
    }

    return dispatch(signup(signupObj)).catch(async (res) => {
      const data = await res.json()
      if (data && data.errors) {
        setValidationErrors(data.errors)
      }
    })
  }

  return (
    <div className='signUpFormPage'>
      <h1>Sign Up </h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input
            id='firstName'
            type='text'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            id='lastName'
            type='text'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpFormPage
