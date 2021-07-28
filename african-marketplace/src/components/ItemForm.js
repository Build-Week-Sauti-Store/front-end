import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { reach } from 'yup'
import formSchema from './components/FormSchema'

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

const initialItems = []
const initialDisabled = true
  
export default function ItemForm() {
    const [items, setItems] = useState(initialItems)          
    const [formValues, setFormValues] = useState(initialFormValues) 
    const [formErrors, setFormErrors] = useState(initialFormErrors) 
    const [disabled, setDisabled] = useState(initialDisabled)   

    const validate = (name, value) => {
        reach(formSchema, name)
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
        const newItem = {
          name: formValues.name.trim(),
          description: formValues.description.trim(),
          price: formValues.price.trim(),
          location: formValues.location,
          category: formValues.category,
        }
        
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

    useEffect(() => {
        formSchema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])
    
    return (
        <form className='form container' onSubmit={formSubmit}>
          <div className='form-group submit'>
            <h2>Add an Item</h2>
    
            <button disabled={disabled}>Submit</button>
    
            <div className='errors'>
              <div>{formErrors.name}</div>
              <div>{formErrors.category}</div>
              <div>{formErrors.location}</div>
              <div>{formErrors.price}</div>
              <div>{formErrors.description}</div>
            </div>
          </div>
    
          <div className='form-group inputs'>
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
            
            <label>Item Name
              <input
                value={formValues.name}
                onChange={inputChange}
                name='name'
                type='text'
              />
            </label>

            <label>Item Category
              <select
                onChange={inputChange}
                value={formValues.category}
                name='category'
              >
                <option value=''>- Select an option -</option>
                <option value='fruitveg'>Fruits and Vegetables</option>
                <option value='animal'>Animal Products</option>
                <option value='grain'>Cereals and Grains</option>
                <option value='bean'>Beans, Seeds, and Nuts</option>
                <option value='other'>Other</option>
              </select>
            </label>

            <label>Item Price
              <input
                value={formValues.price}
                onChange={inputChange}
                name='price'
                type='text'
              />
            </label>

            <label>Item Description
              <input
                value={formValues.description}
                onChange={inputChange}
                name='description'
                type='text'
              />
            </label>
          </div>
        </form>
    )
}