import React from 'react'

import { InputControl, TextAreaControl } from '../components/FormControls'
import { createEvent } from "../api"
import Modal from '../components/Modal'
import "./events.css"
import AuthContext from '../context/auth-context'

const EventsPage = () => {
  const [isCreateEventVisible, toggleCreateEventModal] = React.useState(false)
  const { token } = React.useContext(AuthContext);

  const nameRef = React.useRef("")
  const descriptionRef = React.useRef("")
  const priceRef = React.useRef("")
  const dateRef = React.useRef("")

  const [isCreatingEvent, setCreatingEvent] = React.useState(false)

  const createEventActions = [{
    label: "Cancel",
    isDisabled: isCreatingEvent,
    onClick: () => toggleCreateEventModal(false)
  }, {
    label: "Create",
    isDisabled: isCreatingEvent,
    onClick: async () => {
      let isError = false
      const eventData = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        price: +priceRef.current.value,
        date: dateRef.current.value
      }

      for (let key in eventData) {
        if (eventData[key] === "") {
          isError = true
          alert(`Please provide a ${key} for the event`)
          break;
        }
      }

      if (!isError) {
        setCreatingEvent(true)
        const response = await createEvent(eventData, {token})
        setTimeout(() => {
          setCreatingEvent(true)
          toggleCreateEventModal(false)
          alert(`${response.name} - Event Creation Successful`)
        })
      }
    }
  }]

  return (
    <>
      <div className="events-control">
        <p>Add a new event!</p>
        <button onClick={() => toggleCreateEventModal(true)}>Create Event</button>
      </div>
      {
        isCreateEventVisible && (
          <div className="create-event-form">
            <Modal
              header="Create Event"
              actions={createEventActions}>
              <div>
                <InputControl
                  label="Name"
                  inputProps={{
                    id: "name",
                    type: "text",
                    ref: nameRef,
                    placeholder: "This event's name..."
                  }}
                />
                <TextAreaControl
                  label="Description"
                  inputProps={{
                    id: "name",
                    rows: 3,
                    ref: descriptionRef,
                    placeholder: "About this event..."
                  }}
                />
                <InputControl
                  label="Price"
                  inputProps={{
                    id: "name",
                    type: "number",
                    ref: priceRef,
                    placeholder: "Event cost..."
                  }}
                />
                <InputControl
                  label="Date"
                  inputProps={{
                    id: "date",
                    type: "datetime-local",
                    ref: dateRef,
                    placeholder: "Will occur on..."
                  }}
                />
              </div>
            </Modal>
          </div>
        )
      }
    </>
  )
}

export default EventsPage
