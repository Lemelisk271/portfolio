import { useState, useEffect } from 'react'
import { csrfFetch } from '../../store/csrf'
import ProjectListItem from '../ProjectListItem'
import './ProjectPage.css'

const ProjectPage = ({ user }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/users/${user.id}/projects`)
      const projectData = await res.json()
      console.log(projectData)
      setProjects(projectData)
      setIsLoaded(true)
    }
    loadPage()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='projectPage'>
      {isLoaded ? (
        <>
          <h1>{user.firstName}'s Projects</h1>
          <div className='projectPage-projects'>
            {projects.map((project, i) => (
              <ProjectListItem key={i} project={project}/>
            ))}
          </div>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default ProjectPage
