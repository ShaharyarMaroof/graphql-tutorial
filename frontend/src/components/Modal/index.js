import React from "react";
import PropTypes from 'prop-types'

import Backdrop from "../Backdrop"

import "./styles.css";

const Modal = (props) => {
  return (
    <>
      <Backdrop />
      <div className="modal-container">
        <header className="modal-header">
          {props.header}
        </header>

        <section className="modal-content">
          {props.children}
        </section>

        <footer className="modal-footer">
          {
            props.actions && props.actions.map((action) => {
              return (
                <button className="modal-action" onClick={action.onClick} key={action.label}>{action.label}</button>
              )
            })
          }
        </footer>
      </div>
    </>
  )
}

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.elementType,
  actions: PropTypes.array.isRequired
}
Modal.defaultProps = {
  header: () => "header",
  children: () => <h1>Modal Content </h1>,
  actions: [],
}

export default Modal