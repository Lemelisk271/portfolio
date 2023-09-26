import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { restoreUser } from './store/session'
import LandingPage from './components/LandingPage'
import Navigation from './components/Navigation'
import LoginFormPage from './components/LoginFormPage'
import SignUpFormPage from './components/SignUpFormPage'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
    {isLoaded && (
      <>
        <nav>
          <Navigation isLoaded={isLoaded} />
        </nav>
        <main>
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route exact path='/login'>
              <LoginFormPage />
            </Route>
            <Route exact path='/signup'>
              <SignUpFormPage />
            </Route>
          </Switch>
        </main>
      </>
    )}
    </>
  );
}

export default App;
