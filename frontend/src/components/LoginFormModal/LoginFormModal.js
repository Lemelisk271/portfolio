import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../store/session'
import { useModal } from '../../context/Modal'

const LoginFormModal = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()

  if (sessionUser) return <Redirect to ="/" />

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    return dispatch(login({ credential, password }))
      .then(closeModal)
      .catch(
      async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setErrors(data.errors)
        }
      }
    )
  }

  return (
    <div className='loginFormPage'>
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

export default LoginFormModal
