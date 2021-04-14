const { create } = require("../models/bookings")
const BookingModel = require("../models/bookings")
const EventModel = require("../models/event")
const { getCreatorById, getEventById, formatEventData } = require("./helpers")

const BookingResolvers = {
  bookings: async () => {
    try {
      const bookingsList = await BookingModel.find()

      return bookingsList.map(booking => ({
        ...booking._doc,
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        user: getCreatorById(booking._doc.user),
        event: getEventById(booking._doc.event),
      }))
    } catch (error) {
      console.log("Unable to get bookings", error)
      throw error
    }
  },
  bookEvent: async ({ eventId }) => {
    try {
      const event = await EventModel.findOne({ _id: eventId })
      if (!event) throw new Error("Unable to find Event")

      const booking = new BookingModel({
        user: "6073f10623502448a5aca80e",
        event
      })

      const bookedEvent = await booking.save()

      return {
        ...bookedEvent._doc,
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        user: getCreatorById(booking._doc.user),
        event: getEventById(booking._doc.event),
      }
    } catch (error) {
      console.log("Unable to book event")
      throw error
    }
  },
  cancelBookingById: async ({ bookingId }) => {
    try {
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