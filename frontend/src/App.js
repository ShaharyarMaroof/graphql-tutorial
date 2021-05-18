import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { AuthPage, BookingsPage, EventsPage, BookEventPage } from "./pages"
import './App.css';
import NavBar from './components/NavBar';
import AuthContext from './context/auth-context'

function App() {
  const [appState, setAppState] = React.useState({ userId: null, token: null, tokenExpiration: null })

  const login = (params) => {
    console.log("app state updated login", params)
    setAppState(params)
  }
  const logout = () => {
    console.log("app state updated logout")
    setAppState({ userId: null, token: null, tokenExpiration: null })
  }

  return (
    <BrowserRouter>
      <>
        <AuthContext.Provider value={{ ...appState, login, logout }}>
          <NavBar />
          <main className="app-container">
            <Switch>
              {Boolean(appState.token) && <Redirect from="/" to="/events" exact />}
              {Boolean(appState.token) && <Redirect from="/auth" to="/events" exact />}

              {!Boolean(appState.token) && <Route path="/auth" component={AuthPage} />}
              
              {Boolean(appState.token) && <Route path="/book-event" component={BookEventPage} />}
              
              <Route path="/events" component={EventsPage} />
              <Route path="/bookings" component={BookingsPage} />

              {!Boolean(appState.token) && <Redirect to="/auth" exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
