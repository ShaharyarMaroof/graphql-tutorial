const BookingResolvers = require('./bookings')
const EventResolvers = require('./events')
const UserResolvers = require('./users')

const resolvers = {
  ...EventResolvers,
  ...UserResolvers,
  ...BookingResolvers
}

module.exports = resolvers