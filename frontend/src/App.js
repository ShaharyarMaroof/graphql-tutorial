import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AuthPage, BookingsPage, EventsPage, SignUpPage, BookEventPage } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/bookings" component={BookingsPage} />
          <Route path="/book-event" component={BookEventPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
