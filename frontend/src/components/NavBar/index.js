import React from 'react'
import { NavLink } from 'react-router-dom'
import authContext from '../../context/auth-context'

import './styles.css'

const NavBar = (props) => {
  return (
    <authContext.Consumer>
      {context => {
        const isLoggedIn = Boolean(context.token)

        return (
          <header className="navbar-container">
            <h1 className="navbar-header">Eventa - Book events with ease</h1>

            <nav className="navbar-items">
              <ul>
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
                {
                  isLoggedIn && (
                    <>
                      <li>
                        <NavLink to="/book-event">Book Event</NavLink>
                      </li>
                      <li onClick={() => context.logout()}>
                        <NavLink to="/auth">Log out</NavLink>
                      </li>
                    </>
                  )
                }
                {
                  !isLoggedIn && (
                    <li>
                      <NavLink to="/auth">Auth</NavLink>
                    </li>
                  )
                }
              </ul>
            </nav>
          </header>
        )
      }}
    </authContext.Consumer >
  )
}

export default NavBar