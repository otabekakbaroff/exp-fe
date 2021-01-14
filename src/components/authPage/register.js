import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../axiosWithAuth'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import FaceIcon from '@material-ui/icons/Face';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
      width: '35ch',
    },
  },
}));


function Register(props) {
  const classes = useStyles();
  const [signup, setSignup] = useState({
    // name:'',
    username: '',
    password: ''
  });
  const handleChange = e => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value
    })
  }
  const LoginSubmit = e => {
    e.preventDefault()
    axiosWithAuth().post('/api/users/register', signup)
      .then(response => {
        //console.log('RES DATA', response.data) Just needed to see the readout here to troubleshoot
        localStorage.setItem('username', response.data.user.username)

        localStorage.setItem('token', response.data.token);
        props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="signup">

      <form className={classes.root} noValidate autoComplete="off">

        <h1>Sign Up</h1>

        {/* <TextField name="name" label="Displayed Name" variant="filled" onChange={handleChange} InputProps={{endAdornment: (
                <InputAdornment>
                    <FaceIcon />
                </InputAdornment>)}}/> */}

        <TextField name="username" label="Username" variant="filled" onChange={handleChange} InputProps={{
          endAdornment: (
            <InputAdornment>
              <AccountCircleIcon />
            </InputAdornment>)
        }} />

        <TextField name="password" label="Password" type="password" autoComplete="current-password" variant="filled" onChange={handleChange} InputProps={{
          endAdornment: (
            <InputAdornment>
              <VpnKeyIcon />
            </InputAdornment>)
        }} />

        <Button type="submit" variant="contained" color="primary" size="large" onClick={LoginSubmit}>
          Sign up
                </Button>

        <span>Have an account? <Link to="/">Login</Link></span>

      </form>

    </div>
  )
}


export default Register