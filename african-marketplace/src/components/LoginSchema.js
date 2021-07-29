import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
   email: yup 
   .string()
   .email('Please input a valid email address')
   .required('Email address required'),
   pw: yup
   .string()
   .required('Password required'),
})

export default loginSchema