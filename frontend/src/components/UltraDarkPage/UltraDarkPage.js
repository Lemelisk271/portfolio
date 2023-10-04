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
    // const isTouchDevice = () => {
    //   try {
    //     document.createEvent("TouchEvent")
    //     return true
    //   } catch (e) {
    //     return false
    //   }
    // }

    const getMousePosition = (e) => {
      // mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX
      // mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY

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
      <div className='ultraDarkPage-content'>
        <div className="ultraDarkPage-first">
          <h3>You made it this far!</h3>
          <h3>["hip", "hip"]</h3>
          <p>"hip hip array!" Get it? I crack myself up!</p>
          <i className="fa-solid fa-arrow-down"></i>
          <h4>What's down there?</h4>
        </div>
        <div className="ultraDarkPage-second">
          <h3>Oh no! The lightbulb burt out.</h3>
          <img src='https://zwsmith-portfolio.s3.us-west-2.amazonaws.com/lightbulb.jpg' alt='Burnt Lightbulb'/>
          <p>I'd fix that, but I'm a programmer and that's a hardware problem.</p>
          <i className="fa-solid fa-arrow-left"></i>
          <h4>What's that way?</h4>
        </div>
        <div className="ultraDarkPage-third">
          <h3>Just a little further...</h3>
          <p>Looking for another joke? I'm fresh out.</p>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div className="ultraDarkPage-forth">
          <h3>Well, that's anticlimactic.</h3>
          <button onClick={ultraDarkButton}>Exit</button>
        </div>
      </div>
    </div>
  )
}

export default UltraDarkPage
