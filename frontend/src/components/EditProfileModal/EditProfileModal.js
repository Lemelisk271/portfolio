import { useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { updateUser } from '../../store/session'

const EditProfileModal = ({ user }) => {
  const dispatch = useDispatch()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState('')
  const [phoneNumbers, setPhoneNumbers] = useState(user.phone)
  const [location, setLocation] = useState(user.location)
  const [validationErrors, setValidationErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()

  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  useEffect(() => {
    const areaCode = user.phone.slice(0, 3)
    const firstThree = user.phone.slice(3, 6)
    const lastFour = user.phone.slice(6)
    setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)
  }, [user])

  useEffect(() => {
    const errors = {}

    if (firstName.length === 0) {
      errors.firstName = "Please Enter Your First Name"
    }

    if (lastName.length === 0) {
      errors.lastName = "Please Enter Your Last Name"
    }

    if (!emailReg.test(email)) {
      errors.email = "Please Enter a Valid Email Address"
    }

    const phoneArray = phone.split("")
    let newPhone = ""
    phoneArray.forEach(el => {
      if (!isNaN(parseInt(el))) {
        newPhone += el
      }
    })
    setPhoneNumbers(newPhone)

    if (newPhone.length < 10) {
      errors.phone = "Please Enter a Valid 10 Digit Phone Number"
    }

    if (location.length === 0) {
      errors.location = "Please Enter a Location"
    }

    setValidationErrors(errors)
  }, [firstName, lastName, email, phone, location])

  const editProfileClass = "editProfileModal" + (darkMode ? " editProfileModal-dark" : " editProfileModal-class")

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const profileObj = {
      firstName,
      lastName,
      email,
      phone: phoneNumbers,
      location
    }

    console.log(profileObj)

    return dispatch(updateUser(user.id, profileObj))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setValidationErrors(data.errors)
        }
      })
  }

  return (
    <div className={editProfileClass}>
      <h1>Edit Profile</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
        <form onSubmit={handleSubmit}>
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
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='phone'>Phone:</label>
            <input
              id='phone'
              type='text'
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='location'>Location:</label>
            <input
              id='location'
              type='text'
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default EditProfileModal
