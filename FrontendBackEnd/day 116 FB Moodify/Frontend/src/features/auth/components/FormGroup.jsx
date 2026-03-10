import React from 'react'

const FormGroup = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <input className='w-full '
      value={value}
      onChange={onChange}
      type="text" id={label} placeholder={placeholder} name={label} required />
    </div>
  )
}

export default FormGroup
