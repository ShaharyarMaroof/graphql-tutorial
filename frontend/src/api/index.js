const callGraphQL = async (requestBody, headers = {}) => {
  return await fetch("http://localhost:8080/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  })
}

export const loginUser = async ({ email, password }) => {
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

  const response = await callGraphQL(requestBody)

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to login", response.status)
  }
  const { data: { login } } = await response.json()
  console.log({ login })
  return login
}

export const signUpUser = async ({ name, email, password }) => {
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

  const response = await callGraphQL(requestBody)

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to Sign Up", response.status)
  }
  const { data: { createUser } } = await response.json()
  console.log({ createUser })
}

export const createEvent = async ({ name, description, price, date }, options) => {
  const requestBody = {
    query: `
      mutation {
        createEvent(eventInput: {name: "${name}", description: "${description}", price: ${price}, date: "${date}"}) {
          _id
          name
          description
          price
          creator {
            _id
            name
          }
        }
      }
    `
  }

  const { token } = options
  const headers = {
    "Authorization": `Bearer ${token}`
  }

  console.log("---------")
  console.log(headers)
  console.log("---------")

  const response = await callGraphQL(requestBody, headers)

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to Create Event", response.status)
  }

  const { data: { createEvent } } = await response.json()
  console.log({ createEvent })
  return createEvent
}