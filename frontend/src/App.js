import { useState, useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { restoreUser } from './store/session'
import { UltraDarkModeContext } from './context/UltraDarkContext'
import LandingPage from './components/LandingPage'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import UltraDarkPage from './components/UltraDarkPage'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const { ultraDarkMode } = useContext(UltraDarkModeContext)

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

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
