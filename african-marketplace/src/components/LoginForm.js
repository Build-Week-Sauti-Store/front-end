import React from 'react'

export default function LoginForm(props) {
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
            <h2>Log in to Dashboard</h2>
    
            <button disabled={disabled}>Log In</button>
    
            <div className='errors'>
              <div>{errors.email}</div>
              <div>{errors.password}</div>
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
         </div>
        </form>
      )
}