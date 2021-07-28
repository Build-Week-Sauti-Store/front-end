import React, { useState, useEffect } from 'react'
import ItemForm from './components/ItemForm2'
import RegForm from './components/RegForm2'
import Login from './components/Login'
import formSchema from './components/FormSchema'
import regSchema from './components/RegSchema'
import { reach } from 'yup'
import axios from 'axios'

//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  name: '',
  description: '',
  price:'',
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

const initialRegValues = {
  email: '',
  pw:'',
  location:''
}

const initialRegErrors = {
  email: '',
  pw:'',
  location:''
}

const initialItems = []
const initialDisabled = true

export default function App() {
  //////////////// STATES ////////////////
  const [items, setItems] = useState(initialItems)          
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled)       

  const [regValues, setRegValues] = useState(initialRegValues) 
  const [RegErrors, setRegErrors] = useState(initialRegErrors) 
  const [regDisabled, setRegDisabled] = useState(initialDisabled)

  const postItem = newItem => {
    axios.post('https://african-marketplace-bw4.herokuapp.com/stillneedthis', newItem) //still need the link for this?
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

  const postReg = newReg => {
    axios.post('https://african-marketplace-bw4.herokuapp.com/api/auth/register', newReg)
      .then(res => {
        alert(res.message)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setRegValues(initialRegValues)
      })
  }

  const validateForm = (name, value) => {
    reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const validateReg = (name, value) => {
    reach(regSchema, name)
      .validate(value)
      .then(() => setRegErrors({ ...regErrors, [name]: '' }))
      .catch(err => setRegErrors({ ...regErrors, [name]: err.errors[0]}))
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

  const regSubmit = () => {
    const regData = {
      email: regValues.email,
      pw: regValues.pw,
      location: regValues.location
    }
    
    postReg(regData)
  }

  //////////////// SIDE EFFECTS ////////////////
  
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  useEffect(() => {
    regSchema.isValid(regValues).then(valid => setRegDisabled(!valid))
  }, [regValues])

  //////////////// RETURNS ////////////////
  
  return (
    <div className='container'>
      <header><h1>Log in</h1></header>

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