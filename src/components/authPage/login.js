import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../axiosWithAuth'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2.5),
      width: '35ch',
    },
  },
}));


function Login(props) {

  const classes = useStyles();

  const [login,setLogin]=useState({
      username:'',
      password:''
  });
  
  const handleChange=e=>{
      setLogin({
        ...login,
        [e.target.name]:e.target.value
    })
  }

  const LoginSubmit=e=>{
    e.preventDefault()
    axiosWithAuth().post('/api/users/login', login)
    .then(response=>{
          localStorage.setItem('username',response.data.user.username)
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('receiver-username',response.data.user.chatted_last)
          props.history.push("/dashboard");
    })
    .catch(err=>{
          console.log(err);
    })
  }

  return (
    <div className="login">

        <form className={classes.root} noValidate autoComplete="off">

          <h1>Login</h1>

          <div className="avatar"></div>

          <TextField  name="username" label="Username" variant="filled" onChange={handleChange} InputProps={{ endAdornment: (
          <InputAdornment>
              <AccountCircleIcon />
          </InputAdornment>)}}/>

          <TextField name="password"  label="Password" type="password" autoComplete="current-password" variant="filled"  onChange={handleChange} InputProps={{endAdornment: (
          <InputAdornment>
              <VpnKeyIcon />
          </InputAdornment>)}}/>

          <Button type="submit" variant="contained" color="primary" size="large" onClick={LoginSubmit}>
            Login
          </Button>

          <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>

        </form>

    </div>
  );
}

export default Login;