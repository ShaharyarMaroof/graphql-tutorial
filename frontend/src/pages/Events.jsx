import React from 'react'
import { InputControl, TextAreaControl } from '../components/FormControls'
import Modal from '../components/Modal'
import "./events.css"

const CreateEventsForm = (props) => {
  const nameRef = React.useRef("")
  const descriptionRef = React.useRef("")
  const priceRef = React.useRef("")
  const dateRef = React.useRef("")

  const createEventActions = [{
    label: "Cancel",
    onClick: () => props.toggleCreateEventModal(false)
  }, {
    label: "Create",
    onClick: () => {
      props.handleEventCreation()
      props.toggleCreateEventModal(false)
    }
  }]

  return props.isCreateEventVisible && (
    <div className="create-event-form">
      <Modal
        header="Create Event"
        actions={createEventActions}>
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
            type: "date",
            ref: dateRef,
            placeholder: "Will occur on..."
          }}
        />
      </Modal>
    </div>
  )
}

const EventsPage = () => {
  const [isCreateEventVisible, toggleCreateEventModal] = React.useState(false)

  const handleEventCreation = () => {
    console.log("created a new event")
  }

  return (
    <>
      <div className="events-control">
        <p>Add a new event!</p>
        <button onClick={() => toggleCreateEventModal(true)}>Create Event</button>
      </div>
      <CreateEventsForm
        handleEventCreation={handleEventCreation}
        isCreateEventVisible={isCreateEventVisible}
        toggleCreateEventModal={toggleCreateEventModal}
      />
    </>
  )
}

export default EventsPage
