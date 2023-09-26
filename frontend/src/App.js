import { Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginFormPage from './components/LoginFormPage'

function App() {
  return (
    <>
    <main>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/login'>
          <LoginFormPage />
        </Route>
      </Switch>
    </main>
    </>
  );
}

export default App;
