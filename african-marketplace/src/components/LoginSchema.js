import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please input a valid email address")
    .required("Email address required"),
  pw: yup.string().required("Password required"),
});

export default loginSchema;
