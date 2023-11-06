import { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DarkModeContext } from '../../context/DarkModeContext'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'
import './EmployerForm.css'

const EmployerForm = ({ employer, page }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [startDateMonth, setStartDateMonth] = useState('')
  const [startDateYear, setStartDateYear] = useState('')
  const [endDateMonth, setEndDateMonth] = useState('')
  const [endDateYear, setEndDateYear] = useState('')
  const [currentEmployer, setCurrentEmployer] = useState(false)
  const [yearOptions, setYearOptions] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const { darkMode } = useContext(DarkModeContext)
  const { closeModal } = useModal()
  const { reset, setReset } = useContext(ResetContext)
  const monthOptions = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  useEffect(() => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const startYear = currentYear - 20
    const endYear = currentYear
    const tempYearOptions = []
    for (let i = startYear; i <= endYear; i++) {
      tempYearOptions.push(i)
    }
    setYearOptions(tempYearOptions)

    if (page === 'edit') {
      setTitle(`Edit ${employer.company}`)
      setCompany(employer.company)
      setPosition(employer.position)
      setLocation(employer.location)
      const newStartDate = employer.startDate
      setStartDateMonth(newStartDate.slice(0, 3))
      setStartDateYear(newStartDate.slice(4))
      if (employer.endDate) {
        const newEndDate = employer.endDate
        setEndDateMonth(newEndDate.slice(0, 3))
        setEndDateYear(newEndDate.slice(4))
      }
      if (employer.current) {
        setCurrentEmployer(employer.current)
      }
    } else {
      setTitle('Add Employer')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const errors = {}

    if (company.length === 0) {
      errors.company = "Please enter a company name"
    }

    if(position.length === 0)  {
      errors.position = "Please enter a position"
    }

    if(location.length === 0) {
      errors.location = "Please enter a location"
    }

    if (startDateMonth.length === 0) {
      errors.startDateMonth = "Please select a start month"
    }

    if (startDateYear.length === 0) {
      errors.startDateYear = "Please select a start year"
    }

    if (endDateMonth.length === 0 && !currentEmployer) {
      errors.startDateMonth = "Please select a end month"
    }

    if (endDateYear.length === 0 && !currentEmployer) {
      errors.startDateYear = "Please select a end year"
    }

    setValidationErrors(errors)
  }, [company, position, location, startDateMonth, startDateYear, endDateMonth, endDateYear, currentEmployer])

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    let endDate

    if (currentEmployer) {
      endDate = null
    } else {
      endDate = `${endDateMonth} ${endDateYear}`
    }

    if (page === 'edit') {
      const employerObj = {
        company,
        position,
        location,
        startDate: `${startDateMonth} ${startDateYear}`,
        endDate,
        current: currentEmployer,
        userId: sessionUser.id
      }

      const res = await csrfFetch(`/api/employers/${employer.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employerObj)
      })
      if (res.ok) {
        setReset(!reset)
        closeModal()
      } else {
        const data = await res.json()
        if (data && data.errors) {
          setValidationErrors(data.errors)
        }
      }
    }
  }

  const employerFormClass = "employerForm" + (darkMode ? " employerForm-dark" : " employerForm-light")
  const employerFormButtonClass = "employerForm-formButtons" + (darkMode ? " employerForm-formButtons-dark" : " employerForm-formButtons-light")

  return (
    <div className={employerFormClass}>
      <h1>{title}</h1>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div className='employerForm-formInput'>
          <label htmlFor='company'>Company:</label>
          <input
            id='company'
            type='text'
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </div>
        <div className='employerForm-formInput'>
          <label htmlFor='position'>Position:</label>
          <input
            id='position'
            type='text'
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
        </div>
        <div className='employerForm-formInput'>
          <label htmlFor='location'>Location:</label>
          <input
            id='location'
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className='employerForm-formInput'>
          <label htmlFor='startDate'>Start Date:</label>
          <div id='startDate'>
            <select
              id='startDateMonth'
              value={startDateMonth}
              onChange={e => setStartDateMonth(e.target.value)}
            >
              <option disabled value=''>Select a Month</option>
              {monthOptions.map((month, i) => (
                <option value={month} key={i}>{month}</option>
              ))}
            </select>
            <select
              id="startDateYear"
              value={startDateYear}
              onChange={e => setStartDateYear(e.target.value)}
            >
              <option disabled value=''>Select a Year</option>
              {yearOptions.map((year, i) => (
                <option value={year} key={i}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='employerForm-formInput'>
          <label htmlFor='endDate'>End Date:</label>
          <div id='endDate'>
            <select
              id='endDateMonth'
              value={endDateMonth}
              onChange={e => setEndDateMonth(e.target.value)}
              disabled={currentEmployer}
            >
              <option disabled value=''>Select a Month</option>
              {monthOptions.map((month, i) => (
                <option value={month} key={i}>{month}</option>
              ))}
            </select>
            <select
              id='endDateYear'
              value={endDateYear}
              onChange={e => setEndDateYear(e.target.value)}
              disabled={currentEmployer}
            >
              <option disabled value=''>Select a Year</option>
              {yearOptions.map((year, i) => (
                <option value={year} key={i}>{year}</option>
              ))}
            </select>
            <label>
              <input
                type='checkbox'
                checked={currentEmployer}
                onChange={() => setCurrentEmployer(!currentEmployer)}
              />
              Current Employer
            </label>
          </div>
        </div>
        <div className={employerFormButtonClass}>
          <button type='submit'>Save</button>
          <button onClick={cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EmployerForm
