import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import EmployerForm from '../EmployerForm'
import OpenModalButton from '../OpenModalButton'
import DeleteEmployerModal from '../DeleteEmployerModal'

const ResumeProfileEmployerListItem = ({ employer }) => {
  const { darkMode } = useContext(DarkModeContext)

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
            {employer.current ? (
              <>
                <th scope='row'>Current Employer:</th>
                <td>True</td>
              </>
            ):(
              <>
                <th scope='row'>End Date:</th>
                <td>{employer.endDate}</td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      <div className={resumeProfileEmployerButtonsClass}>
        <OpenModalButton
          buttonText={`Edit ${employer.company}`}
          modalComponent={<EmployerForm employer={employer} page='edit' />}
        />
        <OpenModalButton
          buttonText={`Delete ${employer.company}`}
          modalComponent={<DeleteEmployerModal employer={employer} />}
        />
      </div>
    </div>
  )
}

export default ResumeProfileEmployerListItem
