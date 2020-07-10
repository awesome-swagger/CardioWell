import React from 'react';
import openSocket from 'socket.io-client';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Chart from './Chart';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import cardiowell2 from '../images/cardiowell2.png'
import { MDBDataTable, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import SmsIcon from '@material-ui/icons/Sms';
import EmailIcon from '@material-ui/icons/Email';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import TextField from '@material-ui/core/TextField';
import Moment from 'react-moment';
import Modal from "react-bootstrap/Modal";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment-timezone';
import 'moment/locale/fr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const $ = require('jquery')
$.DataTable = require('datatables.net')

const socket = openSocket('https://careportal.cardiowell.io');

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


export default function DashboardPage(props) {
  if (sessionStorage.getItem('user') === null) {
    //socket.disconnect()
    props.history.push('/')
  }


  const [mainDashboard, setMainDashboard] = React.useState(true);
  const [settings, setSettings] = React.useState(false);
  const [patientDashboard, setPatientDashboard] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState('')
  const [days, setDays] = React.useState(30)
  const [tableView, setTableView] = React.useState('Chart')
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const [selectedPatientFirstName, setSelectedPatientFirstName] = React.useState('');
  const [selectedPatientLastName, setSelectedPatientLastName] = React.useState('');
  const [selectedPatientMRN, setSelectedPatientMRN] = React.useState('');
  const [selectedPatientEmail, setSelectedPatientEmail] = React.useState('');
  const [selectedPatientPhoneNumber, setSelectedPatientPhoneNumber] = React.useState('');
  const [selectedPatientCellNumber, setSelectedPatientCellNumber] = React.useState('');
  const [selectedPatientAddress, setSelectedPatientAddress] = React.useState('')
  const [selectedPatientCity, setSelectedPatientCity] = React.useState('')
  const [selectedPatientState, setSelectedPatientState] = React.useState('')
  const [selectedPatientZip, setSelectedPatientZip] = React.useState('')
  const [selectedPatientTimeZone, setSelectedPatientTimeZone] = React.useState('');
  const [selectedPatientWeightIMEI, setSelectedPatientWeightIMEI] = React.useState('');
  const [selectedPatientBPIMEI, setSelectedPatientBPIMEI] = React.useState('');
  const [selectedPatientID, setSelectedPatientID] = React.useState('')
  const [patientFirstName, setPatientFirstName] = React.useState('');
  const [patientLastName, setPatientLastName] = React.useState('');
  const [patientMRN, setPatientMRN] = React.useState('');
  const [patientEmail, setPatientEmail] = React.useState('');
  const [patientPhoneNumber, setPatientPhoneNumber] = React.useState('');
  const [patientCellNumber, setPatientCellNumber] = React.useState('');
  const [patientAddress, setPatientAddress] = React.useState('');
  const [patientCity, setPatientCity] = React.useState('');
  const [patientState, setPatientState] = React.useState('');
  const [patientZip, setPatientZip] = React.useState('');
  const [patientTimeZone, setPatientTimeZone] = React.useState('');
  const [patientWeightIMEI, setPatientWeightIMEI] = React.useState('');
  const [patientBPIMEI, setPatientBPIMEI] = React.useState('');
  const [serverMessage, setServerMessage] = React.useState('');
  const [serverMessage2, setServerMessage2] = React.useState('');
  const [serverMessage3, setServerMessage3] = React.useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [el, setEl] = React.useState('');
  const [el2, setEl2] = React.useState('');
  const [el3, setEl3] = React.useState('');
  const [el4, setEl4] = React.useState('');
  const [initialized, setInitialized] = React.useState(false);
  const [patients, setPatients] = React.useState(JSON.parse(sessionStorage.getItem('patients')))
  var clinic = props.location.state.clinic

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
          username: sessionStorage.getItem('user'),
          password: password1
        }
        fetch('/routes/users/resetPassword2', {
          method: 'POST',
          body: JSON.stringify(inputValue),
          headers: { "Content-Type": "application/json" }
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
          } catch (e) {
            return setServerMessage("There has been an error. Please try again.")
          }
        })
          .catch((error) => {
            console.error(error);
            setServerMessage("There has been an error. Please try again.")
          });
      } else {
        setServerMessage("Passwords do not match!")
      }
    } else {
      setServerMessage('"Password must contain 8 characters, an uppercase, a lowercase, a number, and a special character"')
    }
  }

  function sendSMS(number, name, username) {
    //setNotification(true)
    var inputValue = {
      number: number,
      name: name,
      username: username
    }
    fetch('/routes/users/notifySMS', {
      method: 'POST',
      body: JSON.stringify(inputValue),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.status !== 201) {


      } else {
        return response.json()
      }
    }).then((data) => {
      try {
        if (data.message === "Success") {
          setModalShow(true)

        }
      } catch (e) {

      }
    })
      .catch((error) => {
        console.error(error);
      });

  }

  function sendEmail(email, name, username) {
    var inputValue = {
      email: email,
      name: name,
      username: username
    }
    fetch('/routes/users/notifyEmail', {
      method: 'POST',
      body: JSON.stringify(inputValue),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.status !== 201) {


      } else {
        return response.json()
      }
    }).then((data) => {
      try {
        if (data.message === "Success") {
          setModalShow(true)

        }
      } catch (e) {

      }
    })
      .catch((error) => {
        console.error(error);
      });

  }

  function deletePatient() {
    var inputValue = {
      clinic: clinic,
      id: selectedPatientID
    }
    fetch('/routes/users/providerDeletePatient', {
      method: 'POST',
      body: JSON.stringify(inputValue),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.status !== 201) {
        return setServerMessage3("There has been an error. Please try again.")
      } else {
        return response.json()
      }
    }).then((data) => {
      sessionStorage.patients = JSON.stringify(data.data)
      setModalShow2(false)
      setPatientDashboard(false)
      setMainDashboard(true)

    })
      .catch((error) => {
        console.error(error);
        setServerMessage3("There has been an error. Please try again.")
      });
  }

  function savePatientChanges() {
    var inputValue = {
      id: selectedPatientID,
      firstName: selectedPatientFirstName,
      lastName: selectedPatientLastName,
      phoneNumber: selectedPatientPhoneNumber,
      cellNumber: selectedPatientCellNumber,
      MRN: selectedPatientMRN,
      email: selectedPatientEmail,
      address: selectedPatientAddress,
      city: selectedPatientCity,
      state: selectedPatientState,
      zip: selectedPatientZip,
      timeZone: selectedPatientTimeZone,
      bpIMEI: selectedPatientBPIMEI,
      weightIMEI: selectedPatientWeightIMEI,
      clinic: clinic
    }
    fetch('/routes/users/providerSavePatientChanges', {
      method: 'POST',
      body: JSON.stringify(inputValue),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.status !== 201) {
        return setServerMessage3("There has been an error. Please try again.")
      } else {
        return response.json()
      }
    }).then((data) => {
      sessionStorage.patients = JSON.stringify(data.data)
      setModalShow2(false)
      setPatientDashboard(false)
      setMainDashboard(true)

    })
      .catch((error) => {
        console.error(error);
        setServerMessage3("There has been an error. Please try again.")
      });
  }


  function notificationButtons(number, email, name, username) {
    return (
      <div><Button onClick={() => sendSMS(number, name, username)}><SmsIcon /></Button><Button onClick={() => sendEmail(email, name, username)}><EmailIcon /></Button></div>
    )
  }

  function exportPDF() {
    // html2canvas($(el4)).then(canvas => {
    //   //document.body.appendChild(canvas);  // if you want see your screenshot in body.
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   pdf.addImage(imgData, 'PNG', 0, 0);
    //   pdf.save("data.pdf"); 
    // });

    const input = document.getElementById("chart3");

    html2canvas(input, {
      width: input.scrollWidth,
      height: input.scrollHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      window.open().document.write('<img src="' + imgData + '" />');
      // const pdf = new jsPDF('l');

      // const imgProps= pdf.getImageProperties(imgData);
      
      // const pdfHeight = pdf.internal.pageSize.getHeight();    
      // const pdfWidth = (imgProps.width/imgProps.height) * pdfHeight;
      
      //// const pdfWidth = pdf.internal.pageSize.getWidth();    
      //// const pdfHeight = (imgProps.height/imgProps.width) * pdfWidth;

      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, 'alias');
      // pdf.save("data.pdf");
    });
  }

  function navigatePatient(name) {
    var foundPatient
    var patientss = JSON.parse(sessionStorage.patients)
    for (var j = 0; j < patientss.length; j++) {
      if (patientss[j].name === name) {
        foundPatient = patientss[j]
      }
    }

    setSelectedPatientFirstName(foundPatient.name.split(' ')[0])
    setSelectedPatientLastName(foundPatient.name.split(' ')[1])
    setSelectedPatientMRN(foundPatient.mrn)
    setSelectedPatientEmail(foundPatient.email)
    setSelectedPatientPhoneNumber(foundPatient.phoneNumber)
    setSelectedPatientCellNumber(foundPatient.cellNumber)
    setSelectedPatientCity(foundPatient.city)
    setSelectedPatientState(foundPatient.state)
    setSelectedPatientAddress(foundPatient.address)
    setSelectedPatientZip(foundPatient.zip)
    setSelectedPatientTimeZone(foundPatient.timeZone2)
    setSelectedPatientWeightIMEI(foundPatient.weightIMEI)
    setSelectedPatientBPIMEI(foundPatient.bpIMEI)
    setSelectedPatientID(foundPatient.id)

    setMainDashboard(false)
    setPatientDashboard(true)


  }

  function returnPatient(x) {
    var foundPatient
    for (var j = 0; j < patients.length; j++) {
      if (patients[j].name === selectedPatient) {
        foundPatient = patients[j]
      }
    }


    var timeZone = foundPatient.timeZone

    var arrayBP = []
    var arrayWS = []
    var d = new Date();
    d.setDate(d.getDate() - x);
    var avgSys = 0
    var avgDia = 0
    for (var z = 0; z < foundPatient.bpm.length; z++) {
      var tempDate = new Date(foundPatient.bpm[z]._created_at)
      if (tempDate >= d) {
        arrayBP.push(foundPatient.bpm[z])
        avgSys += parseInt(foundPatient.bpm[z].systolic)
        avgDia += parseInt(foundPatient.bpm[z].diastolic)
      }
    }
    for (var z = 0; z < foundPatient.ws.length; z++) {
      var tempDate = new Date(foundPatient.ws[z]._created_at)
      if (tempDate >= d) {
        arrayWS.push(foundPatient.ws[z])
      }
    }

    if (arrayBP.length > 0) {
      avgSys = avgSys / arrayBP.length
      avgSys = Math.round(avgSys * .007500617)
      avgDia = avgDia / arrayBP.length
      avgDia = Math.round(avgDia * .007500617)
      var highSys = parseInt(arrayBP[0].systolic)
      var highDia = parseInt(arrayBP[0].diastolic)
      var lowSys = parseInt(arrayBP[0].systolic)
      var lowDia = parseInt(arrayBP[0].diastolic)
      for (var c = 0; c < arrayBP.length; c++) {
        if (highSys / highDia < parseInt(arrayBP[c].systolic) / parseInt(arrayBP[c].diastolic)) {
          highSys = parseInt(arrayBP[c].systolic)
          highDia = parseInt(arrayBP[c].diastolic)
        }
        if (lowSys / lowDia > parseInt(arrayBP[c].systolic) / parseInt(arrayBP[c].diastolic)) {
          lowSys = parseInt(arrayBP[c].systolic)
          lowDia = parseInt(arrayBP[c].diastolic)
        }
      }
      highSys = Math.round(highSys * .007500617)
      highDia = Math.round(highDia * .007500617)
      lowSys = Math.round(lowSys * .007500617)
      lowDia = Math.round(lowDia * .007500617)
    } else {
      var highSys = ''
      var highDia = ''
      var lowSys = ''
      var lowDia = ''
      avgSys = ''
      avgSys = ''
      avgDia = ''
      avgDia = ''
    }



    var tableArray2 = []
    var tableArray3 = []
    for (var r = 0; r < arrayBP.length; r++) {

      var tableObj = {
        date: moment(arrayBP[r]._created_at).tz(timeZone).format('MM/DD/YY'),
        time: moment(arrayBP[r]._created_at).tz(timeZone).format('h:mm A'),
        systolic: Math.round(parseInt(arrayBP[r].systolic) * .007500617),
        diastolic: Math.round(parseInt(arrayBP[r].diastolic) * .007500617),
        pulse: arrayBP[r].pulse
      }
      tableArray2.push(tableObj)
    }
    for (var s = 0; s < arrayWS.length; s++) {
      var weightObj = {
        date: moment(arrayWS[s]._created_at).tz(timeZone).format('MM/DD/YY'),
        time: moment(arrayWS[s]._created_at).tz(timeZone).format('h:mm A'),
        weight: (((parseFloat(arrayWS[s].weight) / 100 * 22046) / 100) / 100 / 10).toFixed(2)
      }
      tableArray3.push(weightObj)
    }



    $(el2).DataTable({
      'retrieve': true,
      'lengthMenu': [[10, 100, -1], [10, 100, "All"]],
      'pageLength': 10
    })
    $(el3).DataTable({
      'retrieve': true,
      'lengthMenu': [[10, 100, -1], [10, 100, "All"]],
      'pageLength': 10
    })

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} ref={el4 => setEl4(el4)}>
          <h2>{foundPatient.name} <Select
            style={{ marginBottom: '10px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            disableUnderline
          >
            <MenuItem style={{ backgroundColor: 'white' }}>BP IMEI: {foundPatient.bpIMEI}</MenuItem>
            <MenuItem style={{ backgroundColor: 'white' }}>Weight IMEI: {foundPatient.weightIMEI}</MenuItem>
            <MenuItem style={{ backgroundColor: 'white' }}>MRN: {foundPatient.mrn}</MenuItem>
            <MenuItem style={{ backgroundColor: 'white' }}>Email: {foundPatient.email}</MenuItem>
            <MenuItem style={{ backgroundColor: 'white' }}>Cell #: {foundPatient.cellNumber}</MenuItem>
          </Select><Button onClick={() => setModalShow2(true)}>Edit</Button><Button onClick={() => exportPDF()}>Export Data</Button></h2>
          <Grid container spacing={3}>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{avgSys}/{avgDia}</h4>
                  <h5 style={{ textAlign: 'center' }}>Avg BP</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>Last {x} Days</p>
                </Container>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{highSys}/{highDia}</h4>
                  <h5 style={{ textAlign: 'center' }}>High BP</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>Last {x} Days</p>
                </Container>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{lowSys}/{lowDia}</h4>
                  <h5 style={{ textAlign: 'center' }}>Low BP</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>Last {x} Days</p>
                </Container>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{arrayBP.length}</h4>
                  <h5 style={{ textAlign: 'center' }}>Readings</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>Last {x} Days</p>
                </Container>
              </Paper>
            </Grid>


          </Grid>
          <div style={{ float: 'right', marginTop: '5px' }}>
            Days {x === 7 ? <Button style={{ backgroundColor: '#F0F0F0' }} onClick={() => setDays(7)}>7</Button>
              : <Button onClick={() => setDays(7)}>7</Button>
            }
            {x === 30 ? <Button style={{ backgroundColor: '#F0F0F0' }} onClick={() => setDays(30)}>30</Button>
              : <Button onClick={() => setDays(30)}>30</Button>
            }
            {x === 60 ? <Button style={{ backgroundColor: '#F0F0F0' }} onClick={() => setDays(60)}>60</Button>
              : <Button onClick={() => setDays(60)}>60</Button>
            }
          </div>
          <div style={{ float: 'left', marginTop: '5px' }}>
            {/* <Button>Readings</Button> */}
            {tableView === 'Chart' ? <div><Button style={{ backgroundColor: '#F0F0F0' }} >Chart</Button><Button onClick={() => setTableView('Readings')}>Readings</Button></div> :
              <div><Button onClick={() => setTableView('Chart')}>Chart</Button><Button style={{ backgroundColor: '#F0F0F0' }}>Readings</Button></div>}

          </div>
        </Container>
        {tableView === 'Chart' ?
          <div style={{ marginTop: '25px' }} id="chart">
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart data={arrayBP} timeZone={timeZone} />
                </Paper>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart2 data={arrayBP} timeZone={timeZone} />
                </Paper>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container} id="chart3">
              <Grid item xs={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart3 data={arrayWS} timeZone={timeZone} />
                </Paper>
              </Grid>
            </Container>
          </div> :
          <div style={{ marginTop: '25px' }} id="chart">
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <h5>BP</h5>
                <Paper >
                  <table class="table stripe" ref={el2 => setEl2(el2)}>
                    <thead>
                      <tr>
                        <th>
                          Date
                      </th>
                        <th>
                          Time
                      </th>
                        <th>
                          Systolic (mmHg)
                      </th>
                        <th>
                          Diastolic (mmHg)
                      </th>
                        <th>
                          Pulse (bpm)
                      </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableArray2.map((row, index) => (
                        <tr>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.systolic}</td>
                          <td>{row.diastolic}</td>
                          <td>{row.pulse}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Paper>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <h5>Weight</h5>
                <Paper >

                  <table class="table stripe" ref={el3 => setEl3(el3)}>
                    <thead>
                      <tr>
                        <th>
                          Date
                      </th>
                        <th>
                          Time
                      </th>
                        <th>
                          Weight (lbs)
                      </th>

                      </tr>
                    </thead>
                    <tbody>
                      {tableArray3.map((row, index) => (
                        <tr>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Paper>
              </Grid>
            </Container>
          </div>
        }

      </main>
    )
  }

  var tableDataArray = []

  patients.forEach(function (singleData, index) {
    if (singleData.bpm.length === 0) {
      var systolic = ''
      var diastolic = ''
      var bpDate = ''
      var pulse = ''
    } else {
      var systolic = Math.round(parseInt(singleData.bpm[0].systolic) * .007500617)
      var diastolic = Math.round(parseInt(singleData.bpm[0].diastolic) * .007500617)
      var bpDate = moment(singleData.bpm[0]._created_at).tz(singleData.timeZone).format('MM/DD/YY h:mm A')
      var pulse = singleData.bpm[0].pulse
    }
    if (singleData.ws.length === 0) {
      var weight = ''
      var wsDate = ''
    } else {
      var weight = (((parseFloat(singleData.ws[0].weight) / 100 * 22046) / 100) / 1000).toFixed(2);
      var wsDate = moment(singleData.ws[0]._created_at).tz(singleData.timeZone).format('MM/DD/YY h:mm A');
    }
    var name = singleData.name
    var tableRow = {
      name: name,
      bptaken: bpDate,
      bp: systolic + '/' + diastolic,
      pulse: pulse,
      weighttaken: wsDate,
      weight: weight,
      notify: notificationButtons(singleData.cellNumber, singleData.email, singleData.name, sessionStorage.getItem('user'))
    }
    tableDataArray.push(tableRow)
  })

  var rows = tableDataArray
  const [tableData, setTableData] = React.useState(rows);

  function addPatient() {
    var inputValue = {
      patientFirstName: patientFirstName,
      patientLastName: patientLastName,
      patientMRN: patientMRN,
      patientEmail: patientEmail,
      patientPhoneNumber: patientPhoneNumber,
      patientCellNumber: patientCellNumber,
      patientCity: patientCity,
      patientState: patientState,
      patientAddress: patientAddress,
      patientZip: patientZip,
      patientTimeZone: patientTimeZone,
      patientBPIMEI: patientBPIMEI,
      patientWeightIMEI: patientWeightIMEI,
      patientClinic: clinic
    }
    fetch('/routes/users/providerAddPatient', {
      method: 'POST',
      body: JSON.stringify(inputValue),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      if (response.status !== 201) {
        return setServerMessage2('There has been an error. Please try again.')
      } else {
        return response.json()
      }
    }).then((data) => {
      sessionStorage.patients = JSON.stringify(data.data)
      setPatientDashboard(false)
      setMainDashboard(true)
    })
      .catch((error) => {
        setServerMessage2('There has been an error. Please try again.')
      });
  }



  React.useEffect(() => {
    socket.emit('patientData', clinic);
    socket.on("patientData", function (data) {

      var tableDataArray = []
      setPatients(data)
      sessionStorage.patients = JSON.stringify(data)

      data.forEach(function (singleData, index) {

        if (singleData.bpm.length === 0) {
          var systolic = ''
          var diastolic = ''
          var bpDate = ''
          var pulse = ''
        } else {
          var systolic = Math.round(parseInt(singleData.bpm[0].systolic) * .007500617)
          var diastolic = Math.round(parseInt(singleData.bpm[0].diastolic) * .007500617)
          var bpDate = moment(singleData.bpm[0]._created_at).tz(singleData.timeZone).format('MM/DD/YY h:mm A')
          var pulse = singleData.bpm[0].pulse
        }
        if (singleData.ws.length === 0) {
          var weight = ''
          var wsDate = ''
        } else {
          var weight = (((parseFloat(singleData.ws[0].weight) / 100 * 22046) / 100) / 1000).toFixed(2);
          var wsDate = moment(singleData.ws[0]._created_at).tz(singleData.timeZone).format('MM/DD/YY h:mm A');
        }
        var name = singleData.name
        var tableRow = {
          name: name,
          bptaken: bpDate,
          bp: systolic + '/' + diastolic,
          pulse: pulse,
          weighttaken: wsDate,
          weight: weight,
          notify: notificationButtons(singleData.cellNumber, singleData.email, singleData.name, sessionStorage.getItem('user'))
        }
        tableDataArray.push(tableRow)
      })
      var rows = tableDataArray
      setTableData(rows)
    })

  }, [])






  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  $(el).DataTable({
    'retrieve': true,
    'lengthMenu': [[10, 100, -1], [10, 100, "All"]],
    'pageLength': 10
  })
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Patient Care Dashboard
          </Typography>
          <img style={{ width: '125px' }} src={cardiowell2}></img>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => {
            setPatientDashboard(false)
            setSettings(false)
            setMainDashboard(true)
          }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => {
            setPatientDashboard(false)
            setMainDashboard(false)
            setSettings(true)
          }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => {
            sessionStorage.clear();
            props.history.push('/');
          }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem></List>
      </Drawer>
      {mainDashboard ?
        <main className={classes.content} show={mainDashboard}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Paper>
                <table class="table" ref={el => setEl(el)}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Last BP Taken</th>
                      <th>BP (mmHg)</th>
                      <th>Pulse</th>
                      <th>Last Weight Taken</th>
                      <th>Weight (lbs)</th>
                      <th>Notify Patient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr >
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.name}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.bptaken}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.bp}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.pulse}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.weighttaken}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.weight}</td>
                        <td>{row.notify}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Paper>
            </Grid>

          </Container>
        </main> : console.log('')}

      {patientDashboard ? returnPatient(days) : console.log('')}
      {settings ? <main className={classes.content} >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Paper >
              <h4>Change Password</h4>
              <form className={classes.form} noValidate onSubmit={e => { e.preventDefault(); }}>
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
                  onChange={(event) => setPassword1(event.target.value)}
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
                  onChange={(event) => setPassword2(event.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submit}
                  onClick={resetPassword}
                >
                  Reset Password
          </Button>
                <p>{serverMessage}</p>
              </form>
            </Paper>
          </Grid>

        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Paper >
              <h4>Add Patient</h4>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  id="name"
                  label="First Name"
                  name="name"
                  autoFocus
                  onChange={(event) => setPatientFirstName(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="name"
                  label="Last Name"
                  id="name"
                  onChange={(event) => setPatientLastName(event.target.value)}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  id="number"
                  label="Medical Record #"
                  name="number"
                  autoFocus
                  onChange={(event) => setPatientMRN(event.target.value)}

                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="number"
                  label="Phone Number"
                  id="number"
                  onChange={(event) => setPatientPhoneNumber(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="number"
                  label="Cell Phone Number"
                  id="number"
                  onChange={(event) => setPatientCellNumber(event.target.value)}

                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="email"
                  label="Email Address"
                  onChange={(event) => setPatientEmail(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="number"
                  label="Blood Pressure IMEI"
                  onChange={(event) => setPatientBPIMEI(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="number"
                  label="Weight IMEI"
                  onChange={(event) => setPatientWeightIMEI(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="address"
                  label="Address"
                  onChange={(event) => setPatientAddress(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="city"
                  label="City"
                  onChange={(event) => setPatientCity(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="state"
                  label="State"
                  onChange={(event) => setPatientState(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  style={{ marginLeft: '15px', width: '40%' }}
                  name="zip"
                  label="Zip"
                  onChange={(event) => setPatientZip(event.target.value)}
                />
                <FormControl className={classes.formControl}>
                  <br></br>
                  <br></br>
                  <InputLabel id="demo-simple-select-label">Time Zone</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(event) => setPatientTimeZone(event.target.value)}
                  >
                    <MenuItem value={'AST'}>AST</MenuItem>
                    <MenuItem value={'EST'}>EST</MenuItem>
                    <MenuItem value={'CST'}>CST</MenuItem>
                    <MenuItem value={'MST'}>MST</MenuItem>
                    <MenuItem value={'PST'}>PST</MenuItem>
                    <MenuItem value={'AKST'}>AKST</MenuItem>
                    <MenuItem value={'HST'}>HST</MenuItem>
                    <MenuItem value={'UTC'}>UTC</MenuItem>
                  </Select>
                </FormControl>
                <p>{serverMessage2}</p>
              </form>
              <Button variant="contained"
                color="primary"
                type="submit"
                className={classes.submit} onClick={addPatient}>
                Add Patient
  </Button>
            </Paper>
          </Grid>
        </Container>
      </main>
        : console.log('')}

      <Modal show={modalShow} onHide={() => setModalShow(false)} style={{ marginTop: '50px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your notification has been sent!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalShow(false)}>
            Okay
      </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalShow2} onHide={() => setModalShow2(false)} style={{ marginTop: '50px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            id="name"
            label="First Name"
            name="name"
            autoFocus
            value={selectedPatientFirstName}
            onChange={(event) => setSelectedPatientFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="name"
            label="Last Name"
            id="name"
            value={selectedPatientLastName}
            onChange={(event) => setSelectedPatientLastName(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            id="number"
            label="Medical Record #"
            name="number"
            autoFocus
            value={selectedPatientMRN}
            onChange={(event) => setSelectedPatientMRN(event.target.value)}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="number"
            label="Phone Number"
            id="number"
            value={selectedPatientPhoneNumber}
            onChange={(event) => setSelectedPatientPhoneNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="number"
            label="Cell Phone Number"
            id="number"
            value={selectedPatientCellNumber}
            onChange={(event) => setSelectedPatientCellNumber(event.target.value)}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="email"
            label="Email Address"
            value={selectedPatientEmail}
            onChange={(event) => setSelectedPatientEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="number"
            label="Blood Pressure IMEI"
            value={selectedPatientBPIMEI}
            onChange={(event) => setSelectedPatientBPIMEI(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="number"
            label="Weight IMEI"
            value={selectedPatientWeightIMEI}
            onChange={(event) => setSelectedPatientWeightIMEI(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="address"
            label="Address"
            value={selectedPatientAddress}
            onChange={(event) => setSelectedPatientAddress(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="city"
            label="City"
            value={selectedPatientCity}
            onChange={(event) => setSelectedPatientCity(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="state"
            label="State"
            value={selectedPatientState}
            onChange={(event) => setSelectedPatientState(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="zip"
            label="Zip"
            value={selectedPatientZip}
            onChange={(event) => setSelectedPatientZip(event.target.value)}
          />
          <FormControl className={classes.formControl}>
            <br></br>
            <InputLabel id="demo-simple-select-label">Time Zone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedPatientTimeZone}
              onChange={(event) => setSelectedPatientTimeZone(event.target.value)}
            >
              <MenuItem value={'AST'}>AST</MenuItem>
              <MenuItem value={'EST'}>EST</MenuItem>
              <MenuItem value={'CST'}>CST</MenuItem>
              <MenuItem value={'MST'}>MST</MenuItem>
              <MenuItem value={'PST'}>PST</MenuItem>
              <MenuItem value={'AKST'}>AKST</MenuItem>
              <MenuItem value={'HST'}>HST</MenuItem>
              <MenuItem value={'UTC'}>UTC</MenuItem>
            </Select>
          </FormControl>

          <p>{serverMessage3}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow2(false)}>
            Close
          </Button>
          <Button onClick={deletePatient}>Delete</Button>
          <Button variant="primary" onClick={savePatientChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}