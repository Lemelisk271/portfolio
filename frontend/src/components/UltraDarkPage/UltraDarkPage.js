import { useContext, useEffect } from 'react'
import { UltraDarkModeContext } from '../../context/UltraDarkContext'
import './UltraDarkPage.css'

const UltraDarkPage = () => {
  const { ultraDarkMode, setUltraDarkMode } = useContext(UltraDarkModeContext)

  useEffect(() => {
    if (!ultraDarkMode) return

    let mouseX = 0
    let mouseY = 0

    let flashlight = document.getElementById('flashlight')

    const getMousePosition = (e) => {
      mouseX = e.pageX
      mouseY = e.pageY

      flashlight.style.setProperty("--pointerX", mouseX + 'px')
      flashlight.style.setProperty("--pointerY", mouseY + 'px')
    }

    document.addEventListener("mousemove", getMousePosition)

    return () => document.removeEventListener("mousemove", getMousePosition)
  }, [ultraDarkMode])

  const ultraDarkButton = (e) => {
    e.preventDefault()
    setUltraDarkMode(!ultraDarkMode)
  }

  return (
    <div className='ultraDarkPage'>
      <div id="flashlight"></div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. In ante metus dictum at. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Feugiat vivamus at augue eget arcu dictum varius duis at. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Urna molestie at elementum eu facilisis sed. Egestas fringilla phasellus faucibus scelerisque. Massa eget egestas purus viverra accumsan. Tristique nulla aliquet enim tortor at auctor urna nunc. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Porttitor eget dolor morbi non arcu risus quis varius quam. Netus et malesuada fames ac turpis egestas integer. Magna eget est lorem ipsum dolor sit amet.
      </p>
      <button onClick={ultraDarkButton}>Turn off Ultra Dark Mode.</button>
    </div>
  )
}

export default UltraDarkPage
