import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { reach } from 'yup'
import loginSchema from './components/LoginSchema'

const initialValues = {
    email: '',
    pw:'',
}

const initialErrors = {
    email: '',
    pw: ''
  }

const initialDisabled = true

export default function Login() {
    const [login, setLogin] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialErrors) 
    const [disabled, setDisabled] = useState(initialDisabled)      

    const validate = (name, value) => {
        reach(loginSchema, name)
          .validate(value)
          .then(() => setFormErrors({ ...formErrors, [name]: '' }))
          .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
      }

    const inputChange = event => {
        const name = event.target
        const value = event.target.value
        validate(name, value)
         setLogin({
           ...login,
           [name]: value 
        })
    }

    const formSubmit = event => {
        event.preventDefault()
        const newLogin = {
          email: login.email.trim(),
          pw: login.pw.trim()
        }
        
        axios.post('https://african-marketplace-bw4.herokuapp.com/api/auth/login', newLogin)
          .then(res => {
            console.log(res.data) //what are we supposed to do here?
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            setLogin(initialValues)
          })
    }

    useEffect(() => {
        loginSchema.isValid(login).then(valid => setDisabled(!valid))
    }, [login])

    return (
        <form className='form container' onSubmit={formSubmit}>
            <div className='form-group submit'>
            <h2>Log In:</h2>
    
            <button disabled={disabled}>Submit</button>
        
            <div className='errors'>
                <div>{formErrors.email}</div>
                <div>{formErrors.pw}</div>
            </div>
            </div>
        
        <div className='form-group inputs'>
            <label>Email
            <input
                value={login.email}
                onChange={inputChange}
                name='email'
                type='email'
            />
            </label>
            <label>Password
            <input
                value={login.pw}
                onChange={inputChange}
                name='pw'
                type='text'
            />
            </label>
        </div>
        </form>
     )
}