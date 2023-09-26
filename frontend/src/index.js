import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { restoreCSRF, csrfFetch } from './store/csrf'
import './index.css';
import App from './App';
import configureStore from './store'
import { ModalProvider, Modal } from './context/Modal'
import * as sessionActions from './store/session'
import DarkModeProvider from './context/DarkModeContext'
import PageProvider from './context/PageContext'

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()

  window.csrfFetch = csrfFetch
  window.store = store
  window.sessionActions = sessionActions
}

function Root() {
  return (
    <PageProvider>
      <DarkModeProvider>
        <ModalProvider>
          <Provider store={store}>
            <BrowserRouter>
              <App />
              <Modal />
            </BrowserRouter>
          </Provider>
        </ModalProvider>
      </DarkModeProvider>
    </PageProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
