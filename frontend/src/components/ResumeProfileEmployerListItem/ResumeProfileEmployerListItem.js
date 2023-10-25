import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import EmployerForm from '../EmployerForm'
import OpenModalButton from '../OpenModalButton'

const ResumeProfileEmployerListItem = ({ employer }) => {
  const { darkMode } = useContext(DarkModeContext)
  console.log(employer)

  const resumeProfileEmployerClass = "resumeProfileEmployerListItem" + (darkMode ? " resumeProfileEmployerListItem-dark" : " resumeProfileEmployerListItem-light")
  const resumeProfileEmployerButtonsClass = "resumeProfileEmployerListItem" + (darkMode ? " resumeProfileEmployerListItem-buttons-dark" : " resumeProfileEmployerListItem-buttons-light")

  return (
    <div className={resumeProfileEmployerClass}>
      <table>
        <tbody>
          <tr>
            <th scope='row'>Company:</th>
            <td>{employer.company}</td>
          </tr>
          <tr>
            <th scope='row'>Position:</th>
            <td>{employer.position}</td>
          </tr>
          <tr>
            <th scope='row'>Location:</th>
            <td>{employer.location}</td>
          </tr>
          <tr>
            <th scope='row'>Start Date:</th>
            <td>{employer.startDate}</td>
          </tr><tr>
            <th scope='row'>End Date:</th>
            <td>{employer.endDate}</td>
          </tr>
        </tbody>
      </table>
      <div className={resumeProfileEmployerButtonsClass}>
        <OpenModalButton
          buttonText={`Edit ${employer.company}`}
          modalComponent={<EmployerForm employer={employer} page='edit' />}
        />
        <button>Delete {employer.company}</button>
      </div>
    </div>
  )
}

export default ResumeProfileEmployerListItem
