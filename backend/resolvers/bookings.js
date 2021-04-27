const BookingModel = require("../models/booking")
const EventModel = require("../models/event")
const { getCreatorById, getEventById, formatEventData, isAuthenticated } = require("./helpers")

const formatBookingData = (booking) => {
  return {
    ...booking._doc,
    createdAt: new Date(booking._doc.createdAt).toISOString(),
    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
    user: getCreatorById(booking._doc.user),
    event: getEventById(booking._doc.event),
  }
}

const BookingResolvers = {
  bookings: async (args, req) => {
    try {
      isAuthenticated(req)
      
      const bookingsList = await BookingModel.find()

      return bookingsList.map(booking => formatBookingData(booking))
    } catch (error) {
      console.log("Unable to get bookings", error)
      throw error
    }
  },
  bookEvent: async ({ eventId }, req) => {
    try {
      isAuthenticated(req)

      const event = await EventModel.findOne({ _id: eventId })
      if (!event) throw new Error("Unable to find Event")

      const booking = new BookingModel({
        user: req.userId,
        event
      })

      const bookedEvent = await booking.save()

      return formatBookingData(bookedEvent)
    } catch (error) {
      console.log("Unable to book event")
      throw error
    }
  },
  cancelBookingById: async ({ bookingId }) => {
    try {
      isAuthenticated(req)

      const booking = await BookingModel.findById(bookingId).populate("event")

      if (!booking) throw new Error("Unable to find User or Booking")

      // delete booking
      await BookingModel.deleteOne({ _id: bookingId })

      return formatEventData(booking.event)
    } catch (error) {
      console.log("Unable to cancel booking", { bookingId, error })
      throw error
    }
  }
}

module.exports = BookingResolvers