import * as Yup from 'yup'

const regSchema = Yup.object().shape({
   email: yup 
   .string()
   .email('Please input a valid email address')
   .required('Email address required'),
   pw: yup
   .string()
   .required('Password required'),
   location: yup
   .string()
   .oneOf(['kya', 'uga', 'tza', 'rwa'], 'Please choose a market location')
})

export default regSchema