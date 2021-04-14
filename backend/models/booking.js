const { Schema, model } = require("mongoose")

const BookingSchema = Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
  { timestamps: true }
)

module.exports = model("Bookings", BookingSchema)