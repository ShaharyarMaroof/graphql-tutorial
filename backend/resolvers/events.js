const EventModel = require("../models/event")
const UserModel = require("../models/user")
const { formatEventData, isAuthenticated} = require("./helpers")

const EventResolvers = {
  events: async () => {
    try {
      const eventsList = await EventModel.find()

      return eventsList.map(event => formatEventData(event))
    } catch (error) {
      console.log("Unable to fetch events", error)
      throw error
    }
  },
  createEvent: async ({ eventInput }, req) => {
    try {
      isAuthenticated(req)
      
      const newEvent = new EventModel({
        ...eventInput,
        date: new Date(eventInput.date),
        price: +eventInput.price,
        creator: req.userId,
      })

      const result = await newEvent.save()
      let createdEvent = formatEventData(result)

      const creator = await UserModel.findById(req.userId)
      if (!creator) throw new Error("Unable to find Creator")

      creator.createdEvents.push(newEvent)
      await creator.save()

      return createdEvent
    } catch (error) {
      console.log("Unable to create events", { eventInput, error })
      throw error
    }
  }

}

module.exports = EventResolvers