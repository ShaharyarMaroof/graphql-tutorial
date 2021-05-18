import React from 'react'
import "../styles.css"

const FormInputControl = (props) => {
  const { label, inputProps } = props

  return (
    <div className="form-control">
      <label htmlFor={label}>{label}</label>
      <input {...inputProps} />
    </div>
  )
}

export default FormInputControl