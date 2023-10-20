import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'

const ResumeProfileProjectBullets = ({ bullet }) => {
  const { darkMode } = useContext(DarkModeContext)

  const resumeProfileProjectBulletClass = "resumeProfileProjectBullets" + (darkMode ? " resumeProfileProjectBullets-dark" : " resumeProfileProjectBullets-light")
  const resumeProfileProjectBulletButtonClass = "resumeProfileProjectBullets-buttons" + (darkMode ? " resumeProfileProjectBullets-buttons-dark" : " resumeProfileProjectBullets-buttons-light")

  return (
    <div className={resumeProfileProjectBulletClass}>
      <p>{bullet.bullet}</p>
      <div className={resumeProfileProjectBulletButtonClass}>
        <button>Edit Bullet</button>
        <button>Delete Bullet</button>
      </div>
    </div>
  )
}

export default ResumeProfileProjectBullets
