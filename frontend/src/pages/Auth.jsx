import React from 'react'

import { InputControl } from "../components/FormControls"
import AuthContext from '../context/auth-context'
import "./auth.css"

const loginUser = async ({ email, password }) => {
  const requestBody = {
    query: `
    {
      login(loginInput: {email: "${email}", password: "${password}"}) {
        userId
        token
        tokenExpiration
      }
    }
    `
  }

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to login", response.status)
  }
  const { data: { login } } = await response.json()
  console.log({ login })
  return login
}

const signUpUser = async ({ name, email, password }) => {
  const requestBody = {
    query: `
    mutation{
      createUser(userInput: {name: "${name}", email: "${email}", password: "${password}"}) {
        _id
        name
        email
      }
    }
    `
  }

  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to Sign Up", response.status)
  }
  const { data: { createUser } } = await response.json()
  console.log({ createUser })
}

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
