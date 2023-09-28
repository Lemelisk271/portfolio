import { useContext, useState, useEffect } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'

const ChangePasswordModal = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  useEffect(() => {
    const errors = {}

    if (password.length === 0) {
      errors.password = "Please Enter a Password"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword  = "The Passwords do not Match"
    }

    setValidationErrors(errors)
  }, [password])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const passObj = {
      password
    }

    console.log(passObj)
  }

  const changePasswordClass = "changePasswordModal" + (darkMode ? "changePasswordModal-dark" : "changePasswordModal-light")

  return (
    <div className={changePasswordClass}>
      <h1>Change Your Password</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='password'>New Password:</label>
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
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default ChangePasswordModal
