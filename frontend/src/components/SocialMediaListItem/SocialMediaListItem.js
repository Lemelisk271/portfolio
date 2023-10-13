import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'

const SocialMediaListItem = ({ social }) => {
  const { darkMode } = useContext(DarkModeContext)

  console.log(social)

  const socialMediaListItemClass = 'socialMediaListItem' + (darkMode ? " socialMediaListItem-dark" : " socialMediaListItem-light")
  const socialMediaListButtonClass = 'socialMediaListItem-buttons' + (darkMode ? " socialMediaListItem-buttons-dark" : " socialMediaListItem-buttons-light")

  return (
    <div className={socialMediaListItemClass}>
      <table>
        <tbody>
          <tr>
            <th scope="row">Icon:</th>
            <td><i className={social.icon}></i></td>
          </tr>
          <tr>
            <th scope="row">Name:</th>
            <td>{social.name}</td>
          </tr>
          <tr>
            <th scope="row">Link:</th>
            <td><a href={social.link} target='_blank' rel="noreferrer">{social.link}</a></td>
          </tr>
        </tbody>
      </table>
      <div className={socialMediaListButtonClass}>
        <button>Edit Social Media</button>
        <button>Delete Social Media</button>
      </div>
    </div>
  )
}

export default SocialMediaListItem
