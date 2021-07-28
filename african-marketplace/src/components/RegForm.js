import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { reach } from 'yup'
import regSchema from './components/RegSchema'

const initialFormValues = {
    email: '',
    pw:'',
    location:''
}
  
const initialFormErrors = {
    email: '',
    pw:'',
    location:''
}

const initialDisabled = true

export default function RegForm() {
    const [formValues, setFormValues] = useState(initialFormValues) 
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled)   
    
    const validate = (name, value) => {
        reach(regSchema, name)
            .validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: '' }))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
    }

    const inputChange = event => {
        const name = event.target
        const value = event.target.value
        validate(name, value)
         setFormValues({
           ...formValues,
           [name]: value 
         })
    }
    
    const formSubmit = event => {
        event.preventDefault()
        const newReg = {
          name: formValues.email.trim(),
          pw: formValues.pw.trim(),
          location: formValues.location
        }
        
        axios.post('https://african-marketplace-bw4.herokuapp.com/api/auth/register', newReg) 
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            setFormValues(initialFormValues)
          })
      }

    useEffect(() => {
        regSchema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

      return (
        <form className='form container' onSubmit={formSubmit}>
          <div className='form-group submit'>
            <h2>Create an Account</h2>
    
            <button disabled={disabled}>Register</button>
    
            <div className='errors'>
              <div>{formErrors.email}</div>
              <div>{formErrors.password}</div>
              <div>{formErrors.location}</div>
            </div>
          </div>
    
          <div className='form-group inputs'>  
            <label>Email
              <input
                value={formValues.name}
                onChange={inputChange}
                name='email'
                type='email'
              />
            </label>
            <label>Password
              <input
                value={formValues.pw}
                onChange={inputChange}
                name='pw'
                type='text'
              />
            </label>

            <label>Market Location
              <select
                onChange={inputChange}
                value={formValues.location}
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