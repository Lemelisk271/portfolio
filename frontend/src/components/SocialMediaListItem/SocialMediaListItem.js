import { useContext } from 'react'
import { DarkModeContext } from '../../context/DarkModeContext'
import SocialMediaForm from '../SocialMediaForm'
import OpenModalButton from '../OpenModalButton'
import DeleteSocialMediaModal from '../DeleteSocialMediaModal'
import './SocialMediaListItem.css'

const SocialMediaListItem = ({ social }) => {
  const { darkMode } = useContext(DarkModeContext)

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
            <td>{social.link}</td>
          </tr>
        </tbody>
      </table>
      <div className={socialMediaListButtonClass}>
        <OpenModalButton
          buttonText="Edit Social Media"
          modalComponent={<SocialMediaForm social={social} page='edit'/>}
        />
        <OpenModalButton
          buttonText="Delete Social Media"
          modalComponent={<DeleteSocialMediaModal social={social} />}
        />
      </div>
    </div>
  )
}

export default SocialMediaListItem
