import React from 'react'
import "../styles.css"

const FormTextAreaControl = (props) => {
  const { label, inputProps } = props

  return (
    <div className="form-control">
      <label htmlFor={label}>{label}</label>
      <textarea {...inputProps} />
    </div>
  )
}

export default FormTextAreaControl;