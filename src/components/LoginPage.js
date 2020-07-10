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

export default function LoginPage(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const [serverMessage2, setServerMessage2] = useState('');

  function sendLink() {
    if (forgotPasswordEmail.length > 0) {
      var inputValue = {
        email: forgotPasswordEmail
    }
    fetch('/routes/users/sendLink', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage2("We do not have that email on record.")
                } else {
                    return response.json()
                }
            }).then((data) => {
                try {
                    if (data.message === "Success") {
                        setForgotPassword(false)
                        setServerMessage('The email has been sent!')

                    }
                } catch(e) {
                    return setServerMessage2("We do not have that email on record.")
                }
                })
                .catch((error) =>{
                    console.error(error);
                });
  } else {
    setServerMessage2("Please enter an email.")
  }
}

  function login() {
    if (password.length > 0 && username.length > 0) {
      
            var inputValue = {
                username: username.toLowerCase(),
                password: password
            }
            if (inputValue.username === 'admin') {
              fetch('https://careportal.cardiowell.io/routes/users/loginAdmin', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage('Incorrect username/password. Please try again.')
                } else {
                    return response.json()
                }
            }).then((data) => {

                    if (data.message === "Success") {
                        sessionStorage.setItem("user", 'admin')
                        props.history.push('/adminDashboard', {clinics: data.clinics, providers: data.providers, patients: data.patients})  
                    } else {
                      setServerMessage('Incorrect username/password. Please try again.')
                    }

                })
                .catch((error) =>{
                    console.error(error);
                    setServerMessage('Incorrect username/password. Please try again.')
                });
            } else {

            fetch('https://careportal.cardiowell.io/routes/users/loginProvider', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage('Incorrect username/password. Please try again.')
                } else {
                    return response.json()
                }
            }).then((data) => {

                    if (data.message === "Success") {
                        sessionStorage.setItem("user", data.user)
                        sessionStorage.setItem("clinic", data.clinic)
                        sessionStorage.patients = JSON.stringify(data.data)
                        props.history.push('/dashboardPage', {clinic: data.clinic})  
                    } else {
                      setServerMessage('Incorrect username/password. Please try again.')
                    }
 
                })
                .catch((error) =>{
                    console.error(error);
                    setServerMessage('Incorrect username/password. Please try again.')
                });
              }
        }  else {
          setServerMessage('Please fill out username and password fields!')
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
            id="name"
            label="Username"
            name="name"
            autoFocus
            onChange= {(event) => setUsername(event.target.value)}
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
            onChange= {(event) => setPassword(event.target.value)}
          />

          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
            onClick={login}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            <Link href="#" variant="body2" onClick={() => setForgotPassword(true)}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <p>{serverMessage}</p>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    

    <Modal show={forgotPassword} onHide={() => setForgotPassword(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Forgot Password</Modal.Title>
    </Modal.Header>
    <Modal.Body><form className={classes.form} noValidate>
      <p>Please enter your email address and we'll send you a link to reset your password</p>
      <TextField
        variant="outlined"
        margin="normal"
        required
        onChange= {(event) => setForgotPasswordEmail(event.target.value)}
        id="email"
        label="Email Address"
        name="email"
        autoFocus
        
      />
     <p>{serverMessage2}</p>

    </form></Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setForgotPassword(false)}>
        Close
      </Button>
      <Button variant="primary"  onClick={sendLink}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>

  </Container>
  );
}