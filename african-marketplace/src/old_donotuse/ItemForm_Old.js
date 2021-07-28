import React from 'react'

export default function ItemForm(props) {
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
            <h2>Add an Item</h2>
    
            <button disabled={disabled}>Submit</button>
    
            <div className='errors'>
              <div>{errors.name}</div>
              <div>{errors.category}</div>
              <div>{errors.location}</div>
              <div>{errors.price}</div>
              <div>{errors.description}</div>
            </div>
          </div>
    
          <div className='form-group inputs'>
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
            
            <label>Item Name
              <input
                value={values.name}
                onChange={onChange}
                name='name'
                type='text'
              />
            </label>

            <label>Item Category
              <select
                onChange={onChange}
                value={values.category}
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
                value={values.price}
                onChange={onChange}
                name='price'
                type='text'
              />
            </label>

            <label>Item Description
              <input
                value={values.description}
                onChange={onChange}
                name='description'
                type='text'
              />
            </label>
          </div>
        </form>
      )
}