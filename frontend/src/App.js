import { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { restoreUser } from './store/session'
import { UltraDarkModeContext } from './context/UltraDarkContext'
import { DarkModeContext } from './context/DarkModeContext'
import LandingPage from './components/LandingPage'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import UltraDarkPage from './components/UltraDarkPage'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { ultraDarkMode } = useContext(UltraDarkModeContext)
  const { darkMode, setDarkMode } = useContext(DarkModeContext)

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    const darkSession = localStorage.getItem("darkMode")
    if (darkSession === null) {
      setDarkMode(false)
    } else if (darkSession === 'true') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
    // eslint-disable-next-line
  }, [darkMode])

  return (
    <>
    {isLoaded && (
      <>
        {ultraDarkMode ? (
          <>
            <UltraDarkPage />
          </>
        ):(
          <>
            <nav>
              <Navigation isLoaded={isLoaded} />
            </nav>
            <main>
              <Switch>
                <Route exact path='/'>
                  <LandingPage />
                </Route>
              </Switch>
            </main>
            <footer>
              <Footer />
            </footer>
          </>
        )}
      </>
    )}
    </>
  );
}

export default App;
