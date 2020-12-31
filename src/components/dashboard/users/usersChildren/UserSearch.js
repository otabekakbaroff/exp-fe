import React,{useState , useContext} from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import {Context} from '../../../Context'

function UserSearch(){
    const socket = useContext(Context).socket;
    const setConnections = useContext(Context).setConnections
    function search(e){
        if(e.target.value.length !== 0){
            socket.emit('user-search', {username:localStorage.getItem('username'), receiver:e.target.value})
        }else{
            setConnections([])
        }
    }
    return(
        <TextField onChange={search} fullWidth label="Search of users..." variant="filled" InputProps={{
            endAdornment: (
            <InputAdornment>
                <SearchIcon />
            </InputAdornment>
            )
        }} />
    )
}

export default UserSearch