import React from 'react'

const FormGroup = ({ label, placeholder }) => {
  return (
    <div className="form-group">
      <input type="text" id={label} placeholder={placeholder} name={label} required />
    </div>
  )
}

export default FormGroup
