const { buildSchema } = require("graphql")

const schema = buildSchema(`
  type Event {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    date: String
    creator: User!
  }

  input EventInput {
    name: String!
    description: String!
    price: Float!
    date: String
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type RootQuery {
    events: [Event!]!
    users: [User!]!
    bookings: [Booking!]!
    login(loginInput:LoginInput):AuthData!
  }

  type RootMutation {
    createEvent(eventInput:EventInput):Event!
    createUser(userInput:UserInput):User!
    bookEvent(eventId:ID!): Booking!
    cancelBookingById(bookingId: ID!): Event!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

module.exports = schema