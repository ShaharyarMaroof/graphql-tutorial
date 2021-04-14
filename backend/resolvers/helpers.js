
const EventModel = require("../models/event")
const UserModel = require("../models/user")

const getCreatorById = async (userId) => {
  try {
    const creator = await UserModel.findById(userId)

    return {
      ...creator._doc,
      createdEvents: await getEventsList(creator._doc.createdEvents)
    }

  } catch (error) {
    console.log("Unable to get Creator", { userId, error })
    throw error
  }
}

const formatEventData = (event) => {
  return ({
    ...event._doc,
    date: new Date(event._doc.date).toISOString(),
    creator: getCreatorById(event._doc.creator)
  })
}

const getEventsList = async (eventIds) => {
  try {
    const eventsList = await EventModel.find({ _id: { $in: eventIds } })

    return eventsList.map(event => formatEventData(event))
  } catch (error) {
    console.log("Unable to get events list", { eventIds, error })

    throw err
  }
}

const getEventById = async (eventId) => {
  try {
    const event = await EventModel.findById(eventId)

    return formatEventData(event)
  } catch (error) {
    console.log("Unable to get event by ID", { eventId, error })
    throw error
  }
}

module.exports = {
  getEventsList,
  getEventById,
  formatEventData,
  getCreatorById
}