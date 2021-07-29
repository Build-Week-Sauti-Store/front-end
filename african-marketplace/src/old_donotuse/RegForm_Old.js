import React from 'react'

export default function RegForm(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
      } = props
    
      const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }
    
      const onChange = evt => {
        const { name, value } = evt.target
        change(name, value)
      }
    
      return (
        <form className='form container' onSubmit={onSubmit}>
          <div className='form-group submit'>
            <h2>Create an Account</h2>
    
            <button disabled={disabled}>Register</button>
    
            <div className='errors'>
              <div>{errors.email}</div>
              <div>{errors.password}</div>
              <div>{errors.location}</div>
            </div>
          </div>
    
          <div className='form-group inputs'>  
            <label>Email
              <input
                value={values.name}
                onChange={onChange}
                name='email'
                type='email'
              />
            </label>
            <label>Password
              <input
                value={values.pw}
                onChange={onChange}
                name='pw'
                type='text'
              />
            </label>

            <label>Market Location
              <select
                onChange={onChange}
                value={values.location}
                name='location'
              >
                <option value=''>- Select an option -</option>
                <option value='kya'>Kenya</option>
                <option value='tza'>Tanzania</option>
                <option value='rwa'>Rwanda</option>
                <option value='uga'>Uganda</option>
              </select>
            </label>
         </div>
        </form>
      )
}