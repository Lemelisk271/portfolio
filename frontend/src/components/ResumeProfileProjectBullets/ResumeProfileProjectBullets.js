import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import OpenModalButton from '../OpenModalButton'
import ProjectBulletPointForm from '../ProjectBulletPointForm'
import DeleteProjectBulletPointModal from '../DeleteProjectBulletPointModal'
import './ResumeProfileProjectBullets.css'

const ResumeProfileProjectBullets = ({ bullet }) => {
  const { darkMode } = useContext(DarkModeContext)

  const resumeProfileProjectBulletClass = "resumeProfileProjectBullets" + (darkMode ? " resumeProfileProjectBullets-dark" : " resumeProfileProjectBullets-light")
  const resumeProfileProjectBulletButtonClass = "resumeProfileProjectBullets-buttons" + (darkMode ? " resumeProfileProjectBullets-buttons-dark" : " resumeProfileProjectBullets-buttons-light")

  return (
    <div className={resumeProfileProjectBulletClass}>
      <p>{bullet.bullet}</p>
      <div className={resumeProfileProjectBulletButtonClass}>
        <OpenModalButton
          buttonText="Edit Bullet"
          modalComponent={<ProjectBulletPointForm bullet={bullet} page="edit" />}
        />
        <OpenModalButton
          buttonText="Delete Bullet"
          modalComponent={<DeleteProjectBulletPointModal bullet={bullet} />}
        />
      </div>
    </div>
  )
}

export default ResumeProfileProjectBullets
