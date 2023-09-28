import { useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../store/session'
import { DarkModeContext } from '../../context/DarkModeContext'
import './LoginFormPage.css'

const LoginFormPage = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)

  if (sessionUser) return <Redirect to ="/profile" />

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    return dispatch(login({ credential, password }))
      .catch(
      async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setErrors(data.errors)
        }
      }
    )
  }

  const loginPageClass = "loginFormPage" + (darkMode ? " loginFormPage-dark" : " loginFormPage-light")

  return (
    <div className={loginPageClass}>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='credential'>Username or Email:</label>
          <input
            id='credential'
            type='text'
            value={credential}
            onChange={e => setCredential(e.target.value)}
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
        {Object.values(errors).length > 0 && <ul>
            {Object.values(errors).map((error, i) => (
              <li key={i} className='error'>{error}</li>
            ))}
          </ul>}
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default LoginFormPage
