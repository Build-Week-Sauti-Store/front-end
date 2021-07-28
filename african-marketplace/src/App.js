import React, { useState, useEffect } from 'react'
import ItemForm from './components/ItemForm'
import LoginForm from './components/LoginForm'
import formSchema from './components/FormSchema'
import loginSchema from './components/LoginSchema'
import { reach } from 'yup'
import axios from 'axios'

//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  name: '',
  description: '',
  price:'',
  ///// DROPDOWN /////
  location: '',
  category: '',
}

const initialFormErrors = {
  name: '',
  description: '',
  price:'',
  location: '',
  category: '',
}

const initialLoginValues = {
  email: '',
  pw:''
}

const initialLoginErrors = {
  email: '',
  pw:''
}

const initialItems = []
const initialDisabled = true

export default function App() {
  //////////////// STATES ////////////////
  const [items, setItems] = useState(initialFriends)          
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [loginValues, setLoginValues] = useState(initialLoginValues) 
  const [loginErrors, setLoginErrors] = useState(initialLoginErrors) 
  const [disabled, setDisabled] = useState(initialDisabled)       

  //////////////// HELPERS ////////////////
  const getItems = () => {
      axios.get('')
      .then(res => {
        setItems(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postItem = newItem => {
    axios.post('https://african-marketplace-bw4.herokuapp.com', newItem)
      .then(res => {
        setItems([res.data, ...items])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const postLogin = newLogin => {
    axios.post('https://african-marketplace-bw4.herokuapp.com', newLogin)
      .then(res => {
        alert(res.message)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoginValues(initialLoginValues)
      })
  }

  const validateForm = (name, value) => {
    reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const validateLogin = (name, value) => {
    reach(loginSchema, name)
      .validate(value)
      .then(() => setLoginErrors({ ...loginErrors, [name]: '' }))
      .catch(err => setLoginErrors({ ...loginErrors, [name]: err.errors[0]}))
  }
  //////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
   validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newItem = {
      name: formValues.name.trim(),
      description: formValues.description.trim(),
      price: formValues.price.trim(),
      location: formValues.location,
      category: formValues.category,
    }
    
    postItem(newItem)
  }

  const loginSubmit = () => {
    const loginData = {
      email: loginValues.email,
      pw: loginValues.pw
    }
    
    postLogin(loginData)
  }

  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  useEffect(() => {
    loginSchema.isValid(loginValues).then(valid => setDisabled(!valid))
  }, [loginValues])

  return (
    <div className='container'>
      <header><h1>App</h1></header>

      <ItemForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </div>
  )
}
