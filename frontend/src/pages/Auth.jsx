import React from 'react'

import { InputControl } from "../components/FormControls"
import { loginUser, signUpUser } from "../api"
import AuthContext from '../context/auth-context'
import "./auth.css"

const AuthPage = () => {
  const nameRef = React.useRef("")
  const emailElRef = React.useRef("")
  const passwordElRef = React.useRef("")

  const context = React.useContext(AuthContext)

  const [isLoginMode, toggleLoginMode] = React.useState(true)

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const email = emailElRef.current && emailElRef.current.value
      const password = passwordElRef.current && passwordElRef.current.value
      const name = nameRef.current && nameRef.current.value

      console.log({ email, password })
      if (email.trim().length === 0 || password.trim().length === 0) {
        alert("Invalid email or password.")
        return
      }

      if (isLoginMode) {
        const response = await loginUser({ email, password })
        context.login(response)
      } else {
        await signUpUser({ name, email, password })
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div className="auth-form">
      <form onSubmit={onSubmit}>
        {/* sign up name */}
        {!isLoginMode && (
          <InputControl
            label="name"
            inputProps={{
              id: "name",
              type: "text",
              ref: nameRef,
              placeholder: "your name"
            }}
          />
        )}

        {/* email */}
        <InputControl
          label="email"
          inputProps={{
            id: "email",
            type: "text",
            ref: emailElRef,
            placeholder: "email"
          }}
        />

        {/* password */}
        <InputControl
          label="password"
          inputProps={{
            id: "password",
            type: "password",
            ref: passwordElRef,
            placeholder: "password"
          }}
        />

        <div className="form-actions">
          <button type='submit'>{isLoginMode ? "Login" : "Sign Up"}</button>
          <button type='button' onClick={() => toggleLoginMode(!isLoginMode)}>Switch to {isLoginMode ? "Sign Up" : "Login"}</button>
        </div>
      </form>
    </div>
  )
}

export default AuthPage
