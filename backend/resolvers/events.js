const EventModel = require("../models/event")
const UserModel = require("../models/user")
const { formatEventData } = require("./helpers")

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
  createEvent: async ({ eventInput }) => {
    try {
      const newEvent = new EventModel({
        ...eventInput,
        date: new Date(eventInput.date),
        price: +eventInput.price,
        creator: "6073f10623502448a5aca80e",
      })

      const result = await newEvent.save()
      let createdEvent = formatEventData(result)

      const creator = await UserModel.findById("6073f10623502448a5aca80e")
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