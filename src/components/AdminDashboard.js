import React from 'react';
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
import { mainListItems } from './listItems';
import Chart from './Chart';
import Button from '@material-ui/core/Button';
import cardiowell2 from '../images/cardiowell2.png'
import Modal from "react-bootstrap/Modal";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MDBDataTable } from 'mdbreact';
import ReactFilestack from 'filestack-react';
const $ = require('jquery')
$.DataTable = require('datatables.net')

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
function rand() {
  return Math.round(Math.random() * 20) - 10;
}



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
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

export default function AdminDashboard(props) {
  if (sessionStorage.getItem('user') !== 'admin') {
    props.history.push('/')  
  }

  const options = {
    accept: 'image/*',
    maxFiles: 1,
    storeTo: {
      location: 's3',
    },
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [selectedClinicName, setSelectedClinicName] = React.useState('')
  const [selectedClinicAddress, setSelectedClinicAddress] = React.useState('')
  const [selectedClinicPhoneNumber, setSelectedClinicPhoneNumber] = React.useState('')
  const [selectedClinicMainContact, setSelectedClinicMainContact] = React.useState('')
  const [selectedClinicID, setSelectedClinicID] = React.useState('')
  const [selectedProviderUsername, setSelectedProviderUsername] = React.useState('')
  const [selectedProviderFirstName, setSelectedProviderFirstName] = React.useState('')
  const [selectedProviderLastName, setSelectedProviderLastName] = React.useState('')
  const [selectedProviderPhoneNumber, setSelectedProviderPhoneNumber] = React.useState('')
  const [selectedProviderEmail, setSelectedProviderEmail] = React.useState('')
  const [selectedProviderClinic, setSelectedProviderClinic] = React.useState('')
  const [selectedProviderID, setSelectedProviderID] = React.useState('')
  const [selectedPatientFirstName, setSelectedPatientFirstName] = React.useState('')
  const [selectedPatientLastName, setSelectedPatientLastName] = React.useState('')
  const [selectedPatientPhoneNumber, setSelectedPatientPhoneNumber] = React.useState('')
  const [selectedPatientCellNumber, setSelectedPatientCellNumber] = React.useState('')
  const [selectedPatientMRN, setSelectedPatientMRN] = React.useState('')
  const [selectedPatientEmail, setSelectedPatientEmail] = React.useState('')
  const [selectedPatientAddress, setSelectedPatientAddress] = React.useState('')
  const [selectedPatientCity, setSelectedPatientCity] = React.useState('')
  const [selectedPatientState, setSelectedPatientState] = React.useState('')
  const [selectedPatientZip, setSelectedPatientZip] = React.useState('')
  const [selectedPatientTimeZone, setSelectedPatientTimeZone] = React.useState('')
  const [selectedPatientBPIMEI, setSelectedPatientBPIMEI] = React.useState('')
  const [selectedPatientWeightIMEI, setSelectedPatientWeightIMEI] = React.useState('')
  const [selectedPatientClinic, setSelectedPatientClinic] = React.useState('')
  const [selectedPatientID, setSelectedPatientID] = React.useState('')
  const [editClinic, setEditClinic] = React.useState(false)
  const [editProvider, setEditProvider] = React.useState(false)
  const [editPatient, setEditPatient] = React.useState(false)
  const [clinicView, setClinicView] = React.useState(true)
  const [providerView, setProviderView] = React.useState(false)
  const [patientView, setPatientView] = React.useState(false)
  const [clinics, setClinics] = React.useState(props.location.state.clinics);
  const [providers, setProviders] = React.useState(props.location.state.providers);
  const [patients, setPatients] = React.useState(props.location.state.patients);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [practiceName, setPracticeName] = React.useState('');
  const [practiceAddress, setPracticeAddress] = React.useState('');
  const [practicePhoneNumber, setPracticePhoneNumber] = React.useState('');
  const [practiceMainContact, setPracticeMainContact] = React.useState('');
  const [providerFirstName, setProviderFirstName] = React.useState('');
  const [providerLastName, setProviderLastName] = React.useState('');
  const [providerEmail, setProviderEmail] = React.useState('');
  const [providerPhoneNumber, setProviderPhoneNumber] = React.useState('');
  const [providerUsername, setProviderUsername] = React.useState('');
  const [providerPassword, setProviderPassword] = React.useState('');
  const [providerClinic, setProviderClinic] = React.useState('');
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
  const [patientClinic, setPatientClinic] = React.useState('');
  const [patientWeightIMEI, setPatientWeightIMEI] = React.useState('');
  const [patientBPIMEI, setPatientBPIMEI] = React.useState('');
  const [serverMessage1, setServerMessage1] = React.useState('');
  const [serverMessage2, setServerMessage2] = React.useState('');
  const [serverMessage3, setServerMessage3] = React.useState('');
  const [serverMessage4, setServerMessage4] = React.useState('');
  const [serverMessage5, setServerMessage5] = React.useState('');
  const [serverMessage6, setServerMessage6] = React.useState('');
  const [fileChosen, setFileChosen] = React.useState(false)
  const [el, setEl] = React.useState('');
  const [el2, setEl2] = React.useState('');
  const [el3, setEl3] = React.useState('');
  const [logo, setLogo] = React.useState('');
  function handleClinicClick(name, address, clinicPhoneNumber, mainContact, id) {
          setSelectedClinicName(name);
          setSelectedClinicAddress(address);
          setSelectedClinicPhoneNumber(clinicPhoneNumber);
          setSelectedClinicMainContact(mainContact);
          setSelectedClinicID(id);
          setEditClinic(true)
  }
  var clinicRows = []
  clinics.forEach(function(singleClinic, index) {
      var name = singleClinic.name
      var address = singleClinic.address
      var clinicPhoneNumber = singleClinic.phoneNumber
      var mainContact = singleClinic.mainContact
      var clinicRow = {
        name: name,
        address: address,
        phoneNumber: clinicPhoneNumber,
        mainContact: mainContact,
        clickEvent: () => {
          handleClinicClick(name, address, clinicPhoneNumber, mainContact, singleClinic._id)
        }
      }
      clinicRows.push(clinicRow)
  })
  var data1 = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Address',
        field: 'address',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Phone Number',
        field: 'phoneNumber',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Main Contact',
        field: 'mainContact',
        width: 270,
        sort: 'asc',
      },
    ],
    rows: clinicRows
  }

  var providerRows = []
  providers.forEach(function(singleProvider, index) {
      var username = singleProvider.username
      var provfirstName = singleProvider.firstName
      var provlastName = singleProvider.lastName
      var provphoneNumber = singleProvider.phoneNumber
      var provemail = singleProvider.email
      var provclinic = singleProvider.clinic
      var providerRow = {
        username: username,
        firstName: provfirstName,
        lastName: provlastName,
        phoneNumber: provphoneNumber,
        email: provemail,
        clinic: provclinic,
        clickEvent: () => {
          setSelectedProviderUsername(username)
          setSelectedProviderFirstName(provfirstName)
          setSelectedProviderLastName(provlastName)
          setSelectedProviderPhoneNumber(provphoneNumber)
          setSelectedProviderEmail(provemail)
          setSelectedProviderClinic(provclinic)
          setSelectedProviderID(singleProvider._id)
          setEditProvider(true)
        }
      }
      providerRows.push(providerRow)
  })
  var data2 = {
    columns: [
      {
        label: 'Username',
        field: 'username',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'First Name',
        field: 'firstName',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Last Name',
        field: 'lastName',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Phone Number',
        field: 'phoneNumber',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Email',
        field: 'email',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Clinic',
        field: 'clinic',
        width: 270,
        sort: 'asc',
      },
    ],
    rows: providerRows
  }
  var patientRows = []
  patients.forEach(function(singlePatient, index) {
      var firstName = singlePatient.firstName
      var lastName = singlePatient.lastName
      var phoneNumber = singlePatient.phoneNumber
      var cellNumber = singlePatient.cellNumber
      var MRN = singlePatient.MRN
      var email = singlePatient.email
      var address = singlePatient.address
      var city = singlePatient.city
      var state = singlePatient.state
      var zip = singlePatient.zip
      var timeZone = singlePatient.timeZone
      var bpIMEI = singlePatient.bpIMEI
      var weightIMEI = singlePatient.weightIMEI
      var clinic = singlePatient.clinic
      var patientRow = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        cellNumber: cellNumber,
        MRN: MRN,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip,
        timeZone: timeZone,
        bpIMEI: bpIMEI,
        weightIMEI: weightIMEI,
        clinic: clinic,
        clickEvent: () => {
          setEditPatient(true)
          setSelectedPatientFirstName(firstName)
          setSelectedPatientLastName(lastName)
          setSelectedPatientPhoneNumber(phoneNumber)
          setSelectedPatientCellNumber(cellNumber)
          setSelectedPatientMRN(MRN)
          setSelectedPatientEmail(email)
          setSelectedPatientAddress(address)
          setSelectedPatientCity(city)
          setSelectedPatientZip(zip)
          setSelectedPatientState(state)
          setSelectedPatientTimeZone(timeZone)
          setSelectedPatientBPIMEI(bpIMEI)
          setSelectedPatientWeightIMEI(weightIMEI)
          setSelectedPatientClinic(clinic)
          setSelectedPatientID(singlePatient._id)
        }
      }
      patientRows.push(patientRow)
  })
  var data3 = {
    columns: [
      {
        label: 'First Name',
        field: 'firstName',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Last Name',
        field: 'lastName',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Phone Number',
        field: 'phoneNumber',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Email',
        field: 'email',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'City',
        field: 'city',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'State',
        field: 'state',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Time Zone',
        field: 'timeZone',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'BP IMEI',
        field: 'bpIMEI',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Weight IMEI',
        field: 'weightIMEI',
        width: 270,
        sort: 'asc',
      },
      {
        label: 'Clinic',
        field: 'clinic',
        width: 270,
        sort: 'asc',
      },
    ],
    rows: patientRows
  }

  function deleteClinic() {
    var inputValue = {
      id: selectedClinicID
    }
    fetch('/routes/users/deleteClinic', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage1("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {
                      setClinics(data.clinics)
                      setEditClinic(false)
                   
                })
                .catch((error) =>{
                    console.error(error);
                    setServerMessage1("There has been an error. Please try again.")
                });

  }

  function saveClinicChanges() {
    var inputValue = {
      id: selectedClinicID,
      name: selectedClinicName,
      address: selectedClinicAddress,
      phoneNumber: selectedClinicPhoneNumber,
      mainContact: selectedClinicMainContact
    }
    fetch('/routes/users/saveClinicChanges', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage1("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {
                      setClinics(data.clinics)
                      setEditClinic(false)
                   
                })
                .catch((error) =>{
                    console.error(error);
                    setServerMessage1("There has been an error. Please try again.")
                });
  }

  function deleteProvider() {
    var inputValue = {
      id: selectedProviderID
    }
    fetch('/routes/users/deleteProvider', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage2("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {
                      setProviders(data.providers)
                      setEditProvider(false)
                   
                })
                .catch((error) =>{
                    console.error(error);
                    setServerMessage2("There has been an error. Please try again.")
                });
  }

  function saveProviderChanges() {
    var inputValue = {
      id: selectedProviderID,
      username: selectedProviderUsername,
      firstName: selectedProviderFirstName,
      lastName: selectedProviderLastName,
      phoneNumber: selectedProviderPhoneNumber,
      email: selectedProviderEmail,
      clinic: selectedProviderClinic
    }
    fetch('/routes/users/saveProviderChanges', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage2("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {
              setProviders(data.providers)
              setEditProvider(false)
                   
                })
                .catch((error) =>{
                    console.error(error);
                    setServerMessage2("There has been an error. Please try again.")
                });
  }

  function deletePatient() {
    var inputValue = {
      id: selectedPatientID
    }
    fetch('/routes/users/deletePatient', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage3("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {
                      setPatients(data.patients)
                      setEditPatient(false)
                   
                })
                .catch((error) =>{
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
      clinic: selectedPatientClinic
    }
    fetch('/routes/users/savePatientChanges', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage3("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {
                      setPatients(data.patients)
                      setEditPatient(false)
                   
                })
                .catch((error) =>{
                    console.error(error);
                    setServerMessage3("There has been an error. Please try again.")
                });
  }

  function renderClinics1() {
    return (
      <FormControl className={classes.formControl}>
            <br></br>
        <InputLabel id="demo-simple-select-label">Clinic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange= {(event) => setProviderClinic(event.target.value)}
        >
          {clinics.map(clinic => <MenuItem  value={clinic.name}>{clinic.name}</MenuItem>)}
          
          
        </Select>
      </FormControl>
    );
  }
  function renderClinics2() {
    return (
      <FormControl className={classes.formControl}>
            <br></br>
        <InputLabel id="demo-simple-select-label">Clinic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange= {(event) => setPatientClinic(event.target.value)}
        >
          {clinics.map(clinic => <MenuItem  value={clinic.name}>{clinic.name}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }
  function renderClinics3() {
    return (
      <FormControl className={classes.formControl}>
            <br></br>
        <InputLabel id="demo-simple-select-label">Clinic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProviderClinic}
          onChange= {(event) => setSelectedProviderClinic(event.target.value)}
        >
          {clinics.map(clinic => <MenuItem  value={clinic.name}>{clinic.name}</MenuItem>)}
          
          
        </Select>
      </FormControl>
    );
  }
  function renderClinics4() {
    return (
      <FormControl className={classes.formControl}>
            <br></br>
        <InputLabel id="demo-simple-select-label">Clinic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPatientClinic}
          onChange= {(event) => setSelectedPatientClinic(event.target.value)}
        >
          {clinics.map(clinic => <MenuItem  value={clinic.name}>{clinic.name}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }


  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  function addClinic() {
      var inputValue = {
        practiceName: practiceName,
        practiceAddress: practiceAddress,
        practicePhoneNumber: practicePhoneNumber,
        practiceMainContact: practiceMainContact,
        logo: logo
      }
      fetch('/routes/users/addClinic', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage4("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {

                    if (data.message === "Success") {

                      setClinics(data.clinics)
                      handleClose1()
                    }

                })
                .catch((error) =>{
                  setServerMessage4("There has been an error. Please try again.")
                    console.log(error);
                });
  }

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
        patientClinic: patientClinic
      }
      fetch('/routes/users/addPatient', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage6("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {

                    if (data.message === "Success") {
                      setPatients(data.patients)
                      handleClose3()

                   
                }
                })
                .catch((error) =>{
                  setServerMessage6("There has been an error. Please try again.")
                    console.log(error);
                });
  }

  function password_check(pass) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.exec(pass) == null) {
      return false
    }
    else {
      return true
    }
  }

  function addProvider() {
      if (password_check(providerPassword)) {
      var inputValue = {
        providerUsername: providerUsername.toLowerCase(),
        providerFirstName: providerFirstName,
        providerLastName: providerLastName,
        providerPhoneNumber: providerPhoneNumber,
        providerEmail: providerEmail,
        password: providerPassword,
        providerClinic: providerClinic,
      }
      fetch('/routes/users/addProvider', {
                method: 'POST',
                body: JSON.stringify(inputValue),
                headers: { "Content-Type": "application/json"}
            }).then((response) => {
                if (response.status !== 201) {
                    return setServerMessage5("There has been an error. Please try again.")
                } else {
                    return response.json()
                }
            }).then((data) => {

                    if (data.message === "Success") {
                      setProviders(data.providers)
                      handleClose2()
                    }

                })
                .catch((error) =>{
                  setServerMessage5("There has been an error. Please try again.")
                    console.log(error);
                });
              } else {
                setServerMessage5("Password must contain 8 characters, an uppercase, a lowercase, a number, and a special character")
              }
  }

$(el).DataTable({
  'retrieve': true,
  'lengthMenu': [ [10, 100, -1], [10, 100, "All"] ],
    'pageLength': 10
})
$(el2).DataTable({
  'retrieve': true,
  'lengthMenu': [ [10, 100, -1], [10, 100, "All"] ],
    'pageLength': 10
})
$(el3).DataTable({
  'retrieve': true,
  'lengthMenu': [ [10, 100, -1], [10, 100, "All"] ],
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
          Admin Dashboard
          </Typography>
          <img style={{width: '125px'}} src={cardiowell2}></img>
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
        <List>{mainListItems}</List>
        </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

        <Modal style={{marginTop: '50px', marginLeft: '75px', width: '75%'}} show={editClinic} onHide={() => setEditClinic(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Clinic</Modal.Title>
        </Modal.Header>
        <Modal.Body><form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="name"
            label="Practice Name"
            name="name"
            autoFocus
            value={selectedClinicName}
            onChange= {(event) => setSelectedClinicName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="address"
            label="Street Address"
            id="address"
            value={selectedClinicAddress}
            onChange= {(event) => setSelectedClinicAddress(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Phone Number"
            id="number"
            value={selectedClinicPhoneNumber}
            onChange= {(event) => setSelectedClinicPhoneNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="contact"
            label="Main Contact"
            id="contact"
            value={selectedClinicMainContact}
            onChange= {(event) => setSelectedClinicMainContact(event.target.value)}
          />
  
      <p>{serverMessage1}</p>
        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditClinic(false)}>
            Close
          </Button>
          <Button onClick={() => deleteClinic()}>Delete</Button>
          <Button variant="primary" onClick={saveClinicChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal style={{marginTop: '50px', marginLeft: '75px', width: '75%'}} show={editProvider} onHide={() => setEditProvider(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body><form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="name"
            label="First Name"
            name="name"
            autoFocus
            value={selectedProviderFirstName}
            onChange= {(event) => setSelectedProviderFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="name"
            label="Last Name"
            id="name"
            value={selectedProviderLastName}
            onChange= {(event) => setSelectedProviderLastName(event.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={selectedProviderEmail}
            onChange= {(event) => setSelectedProviderEmail(event.target.value)}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Phone Number"
            id="number"
            value={selectedProviderPhoneNumber}
            onChange= {(event) => setSelectedProviderPhoneNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="username"
            label="Username"
            id="username"
            value={selectedProviderUsername}
            onChange= {(event) => setSelectedProviderUsername(event.target.value)}
            
          />

          {renderClinics3()}
          <p>{serverMessage2}</p>

        </form></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setEditProvider(false)}>
            Close
          </Button>
          <Button onClick={deleteProvider}>Delete</Button>
          <Button variant="primary" onClick={saveProviderChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal style={{marginTop: '50px', marginLeft: '75px', width: '75%'}} show={editPatient} onHide={() => setEditPatient(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body><form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="name"
            label="First Name"
            name="name"
            autoFocus
            value={selectedPatientFirstName}
            onChange= {(event) => setSelectedPatientFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="name"
            label="Last Name"
            id="name"
            value={selectedPatientLastName}
            onChange= {(event) => setSelectedPatientLastName(event.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="number"
            label="Medical Record #"
            name="number"
            autoFocus
            value={selectedPatientMRN}
            onChange= {(event) => setSelectedPatientMRN(event.target.value)}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Phone Number"
            id="number"
            value={selectedPatientPhoneNumber}
            onChange= {(event) => setSelectedPatientPhoneNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Cell Phone Number"
            id="number"
            value={selectedPatientCellNumber}
            onChange= {(event) => setSelectedPatientCellNumber(event.target.value)}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="email"
            label="Email Address"
            value={selectedPatientEmail}
            onChange= {(event) => setSelectedPatientEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Blood Pressure IMEI"
            value={selectedPatientBPIMEI}
            onChange= {(event) => setSelectedPatientBPIMEI(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Weight IMEI"
            value={selectedPatientWeightIMEI}
            onChange= {(event) => setSelectedPatientWeightIMEI(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="address"
            label="Address"
            value={selectedPatientAddress}
            onChange= {(event) => setSelectedPatientAddress(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="city"
            label="City"
            value={selectedPatientCity}
            onChange= {(event) => setSelectedPatientCity(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="state"
            label="State"
            value={selectedPatientState}
            onChange= {(event) => setSelectedPatientState(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="zip"
            label="Zip"
            value={selectedPatientZip}
            onChange= {(event) => setSelectedPatientZip(event.target.value)}
          />
          <FormControl className={classes.formControl}>
            <br></br>
        <InputLabel id="demo-simple-select-label">Time Zone</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value = {selectedPatientTimeZone}
          onChange= {(event) => setSelectedPatientTimeZone(event.target.value)}
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

      {renderClinics4()}
      <p>{serverMessage3}</p>
        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditPatient(false)}>
            Close
          </Button>
          <Button onClick={deletePatient}>Delete</Button>
          <Button variant="primary" onClick={savePatientChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal style={{marginTop: '50px', marginLeft: '75px', width: '75%'}} show={open1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Clinic</Modal.Title>
        </Modal.Header>
        <Modal.Body><form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="name"
            label="Practice Name"
            name="name"
            autoFocus
            onChange= {(event) => setPracticeName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="address"
            label="Street Address"
            id="address"
            onChange= {(event) => setPracticeAddress(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Phone Number"
            id="number"
            onChange= {(event) => setPracticePhoneNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="contact"
            label="Main Contact"
            id="contact"
            onChange= {(event) => setPracticeMainContact(event.target.value)}
          />
<ReactFilestack
                            apikey="AzZUFD6MGQ4ywxBIR5OFMz"
                            buttonText="Click me"
                            buttonClass="classname"
                            options={options}
                            onSuccess={(result) => {
                              setLogo(result.filesUploaded[0].url)
                              setFileChosen(true)
                            }}
                            /> {fileChosen? <p>File Uploaded!</p>:<p>(Optional)</p>}

  <p>{serverMessage4}</p>
        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={addClinic}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal style={{marginTop: '50px', marginLeft: '75px', width: '75%'}} show={open2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body><form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="name"
            label="First Name"
            name="name"
            autoFocus
            onChange= {(event) => setProviderFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="name"
            label="Last Name"
            id="name"
            onChange= {(event) => setProviderLastName(event.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange= {(event) => setProviderEmail(event.target.value)}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Phone Number"
            id="number"
            onChange= {(event) => setProviderPhoneNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="username"
            label="Username"
            id="username"
            onChange= {(event) => setProviderUsername(event.target.value)}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="password"
            label="Password"
            type="password"
            onChange= {(event) => setProviderPassword(event.target.value)}
          />
          {renderClinics1()}
          <p>{serverMessage5}</p>
        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={addProvider}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal style={{marginTop: '50px', marginLeft: '75px', width: '75%'}} show={open3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Add Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body><form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="name"
            label="First Name"
            name="name"
            autoFocus
            onChange= {(event) => setPatientFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="name"
            label="Last Name"
            id="name"
            onChange= {(event) => setPatientLastName(event.target.value)}
          />

<TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            id="number"
            label="Medical Record #"
            name="number"
            autoFocus
            onChange= {(event) => setPatientMRN(event.target.value)}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Phone Number"
            id="number"
            onChange= {(event) => setPatientPhoneNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Cell Phone Number"
            id="number"
            onChange= {(event) => setPatientCellNumber(event.target.value)}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="email"
            label="Email Address"
            onChange= {(event) => setPatientEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Blood Pressure IMEI"
            onChange= {(event) => setPatientBPIMEI(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="number"
            label="Weight IMEI"
            onChange= {(event) => setPatientWeightIMEI(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="address"
            label="Address"
            onChange= {(event) => setPatientAddress(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="city"
            label="City"
            onChange= {(event) => setPatientCity(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="state"
            label="State (abbreviated)"
            onChange= {(event) => setPatientState(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{marginLeft: '15px', width: '40%'}}
            name="zip"
            label="Zip"
            onChange= {(event) => setPatientZip(event.target.value)}
          />
          <FormControl className={classes.formControl}>
            <br></br>
        <InputLabel id="demo-simple-select-label">Time Zone</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange= {(event) => setPatientTimeZone(event.target.value)}
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

      {renderClinics2()}
      <p>{serverMessage6}</p>
        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
          <Button variant="primary" onClick={addPatient}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Button style={{marginTop:'75px'}} onClick={handleOpen1}>Add Clinic</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Button style={{marginTop:'75px'}} onClick={handleOpen2}>Add Provider</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <Button style={{marginTop:'75px'}} onClick={handleOpen3}>Add Patient</Button>
              </Paper>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '15px'}} container spacing={3}>
            {clinicView?
            <Button style={{backgroundColor: '#F0F0F0'}}>Clinics</Button>
            : <Button onClick={() => {
              setProviderView(false)
              setPatientView(false)
              setClinicView(true)
            }}>Clinics</Button>}
            {providerView?
            <Button style={{backgroundColor: '#F0F0F0'}}>Providers</Button>
            : <Button onClick={() => {
              setPatientView(false)
              setClinicView(false)
              setProviderView(true)
              }}>Providers</Button>}
            {patientView?
            <Button style={{backgroundColor: '#F0F0F0'}}>Patients</Button>
            : <Button onClick={() => {
              setClinicView(false)
              setProviderView(false)
              setPatientView(true)
            }}>Patients</Button>}
          </Grid>
        </Container>
        {clinicView?
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Paper >
            <table class="table stripe" ref={el => setEl(el)}>
            <thead>
              <tr>
                <td>Name</td>
                <td>Address</td>
                <td>Phone Number</td>
                <td>Contact</td>
              </tr>
            </thead>
            <tbody>
            {clinicRows.map((row, index) => (
      <tr onClick={row.clickEvent}>
        <td >{row.name}</td>
          <td >{row.address}</td>
          <td >{row.phoneNumber}</td>
          <td >{row.mainContact}</td>
          
        </tr>
    ))}
            </tbody>
            </table>

    </Paper>
          </Grid>
        </Container>
        : console.log(' ')}
         {providerView?
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Paper >
          <table class="table stripe" ref={el2 => setEl2(el2)}>
            <thead>
              <tr>
                <td>Username</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Phone Number</td>
                <td>Email</td>
                <td>Clinic</td>
              </tr>
            </thead>
            <tbody>
            {providerRows.map((row, index) => (
      <tr onClick={row.clickEvent}>
        <td >{row.username}</td>
          <td >{row.firstName}</td>
          <td >{row.lastName}</td>
          <td >{row.phoneNumber}</td>
          <td >{row.email}</td>
          <td >{row.clinic}</td>
        </tr>
    ))}
            </tbody>
            </table>
    </Paper>
          </Grid>
        </Container>
        : console.log(' ')}
        {patientView?
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Paper >
          <table class="table stripe" ref={el3 => setEl3(el3)}>
            <thead>
              <tr>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Phone Number</td>
                <td>Cell Number</td>
                <td>Email</td>
                <td>City</td>
                <td>State</td>
                <td>Time Zone</td>
                <td>BP IMEI</td>
                <td>Weight IMEI</td>
                <td>Clinic</td>
              </tr>
            </thead>
            <tbody>
            {patientRows.map((row, index) => (
      <tr onClick={row.clickEvent}>
          <td >{row.firstName}</td>
          <td >{row.lastName}</td>
          <td >{row.phoneNumber}</td>
          <td >{row.cellNumber}</td>
          <td >{row.email}</td>
          <td >{row.city}</td>
          <td >{row.state}</td>
          <td >{row.timeZone}</td>
          <td >{row.bpIMEI}</td>
          <td >{row.weightIMEI}</td>
          <td >{row.clinic}</td>
        </tr>
    ))}
            </tbody>
            </table>
    </Paper>
          </Grid>
        </Container>
        : console.log(' ')}
      </main>
    </div>
  );
}