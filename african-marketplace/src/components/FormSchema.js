import * as Yup from 'yup'

const formSchema = Yup.object().shape({
   name: yup 
   .string()
   .trim()
   .required('Please input an item name')
   .min(3,'Item name must be at least 3 characters long'),
   location: yup
   .string()
   .oneOf(['kya', 'uga', 'tza', 'rwa'], 'Please choose a market location'),
   category: yup
   .string()
   .oneOf(['fruitveg', 'animal', 'grain', 'bean','other'], 'Please choose a product category'),
   price: yup
   .number()
   .required('Please input an item price'),
   description: yup 
   .string()
   .trim()
   .required('Please input an item description')
   .min(10,'Item description must be at least 10 characters long')
})

export default formSchema