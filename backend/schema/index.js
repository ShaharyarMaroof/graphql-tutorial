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

  type RootQuery {
    events: [Event!]!
    users: [User!]!
    bookings: [Booking!]!
  }

  type RootMutation {
    createEvent(eventInput:EventInput):Event
    createUser(userInput:UserInput):User
    bookEvent(eventId:ID!): Booking!
    cancelBookingById(bookingId: ID!): Event!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

module.exports = schema