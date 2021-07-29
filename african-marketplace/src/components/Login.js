import React, { useState, useEffect } from "react";
import loginSchema from "./LoginSchema";
import axios from "axios";
import { reach } from "yup";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const initialValues = {
  email: "",
  pw: "",
};

const initialErrors = {
  email: "",
  pw: "",
};

const initialDisabled = true;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [login, setLogin] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const validate = (name, value) => {
    reach(loginSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const inputChange = (event) => {
    const name = event.target;
    const value = event.target.value;
    validate(name, value);
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const newLogin = {
      email: login.email.trim(),
      pw: login.pw.trim(),
    };

    axios
      .post(
        "https://african-marketplace-bw4.herokuapp.com/api/auth/login",
        newLogin
      )
      .then((res) => {
        console.log(res.data); //what are we supposed to do here?
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLogin(initialValues);
      });
  };

  useEffect(() => {
    loginSchema.isValid(login).then((valid) => setDisabled(!valid));
  }, [login]);

  return (
    <form className="form container" onSubmit={formSubmit}>
      <Container component="main" maxWidth="xs">
        <div className="form-group submit">
          <div className="errors">
            <div>{formErrors.email}</div>
            <div>{formErrors.pw}</div>
          </div>
        </div>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={login.email}
              onChange={inputChange}
              name="email"
              type="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={login.pw}
              onChange={inputChange}
              name="pw"
              type="text"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </form>
  );
}
