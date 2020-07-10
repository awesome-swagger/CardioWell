import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import cardiowell1 from '../images/cardiowell1.png'
import Modal from "react-bootstrap/Modal";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://material-ui.com/">
        cardiowell
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword(props) {
  const classes = useStyles();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [serverMessage, setServerMessage] = useState('');

  const [userID, setUserID] = useState(props.location.pathname.split('/')[2])

  function password_check(pass) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.exec(pass) == null) {
      return false
    }
    else {
      return true
    }
  }

  function resetPassword() {
    if (password_check(password1)) {
        if (password1 === password2) {
          var inputValue = {
              id: userID,
              password: password1
          }
          fetch('/routes/users/resetPassword', {
                      method: 'POST',
                      body: JSON.stringify(inputValue),
                      headers: { "Content-Type": "application/json"}
                  }).then((response) => {
                      if (response.status !== 201) {
                          return setServerMessage("There has been an error. Please try again.")
                      } else {
                          return response.json()
                      }
                  }).then((data) => {
                      try {
                          if (data.message === "Success") {
                              setServerMessage('Your password has been reset!')
                              setPassword1('')
                              setPassword2('')

                          }
                      } catch(e) {
                          return setServerMessage("There has been an error. Please try again.")
                      }
                      })
                      .catch((error) =>{
                          console.error(error);
                      });
        } else {
          setServerMessage("Passwords do not match!")
        }
    } else {
    setServerMessage('"Password must contain 8 characters, an uppercase, a lowercase, a number, and a special character"')
    }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img style={{width: '50%'}} src={cardiowell1}></img>
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
        <form className={classes.form} noValidate onSubmit={e => {e.preventDefault();}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Password"
            type="Password"
            name="email"
            autoFocus
            onChange= {(event) => setPassword1(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange= {(event) => setPassword2(event.target.value)}
          />

          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
            onClick={resetPassword}
          >
            Reset Password
          </Button>
          <p>{serverMessage}</p>
          {serverMessage === 'Your password has been reset!'? <p>Click <a href="http://cardiowell.herokuapp.com/">here</a> to login</p>: console.log('')}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>


  </Container>
  );
}