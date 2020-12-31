import React, { useContext,useState } from 'react'
import SendIcon from '@material-ui/icons/Send';
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import MicIcon from '@material-ui/icons/Mic';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {Context} from '../../../Context'

function SendBox(){
    const [message,setMessage]=useState({
        username:localStorage.getItem('username'),
        receiver_username:'',
        message:'',
        date: ''
    });
    const socket = useContext(Context).socket
    function handleChange(e){
        setMessage({
            ...message,
            [e.target.name]:e.target.value
        })
    }
    function send(e){
        e.preventDefault()
        socket.emit('private', {...message,receiver_username:localStorage.getItem('receiver-username'), date:Date.now()})
    }

    return (
        <div className="send-box">
                <IconButton >
                    <PhotoCameraIcon />
                </IconButton>
                <IconButton >
                    <PhotoLibraryIcon />
                </IconButton>
                <IconButton >
                    <MicIcon />
                </IconButton>
                <TextField  id="text" className="textareawidth" label="Type here..." variant="outlined" onChange={handleChange} name="message" InputProps={{
                    endAdornment: (
                    <InputAdornment>
                        <IconButton >
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </InputAdornment>
                )}}/>
                <div className="send-button-box">
                    <IconButton type="Submit" id="send-button"  onClick={send}>
                        <SendIcon type="Submit"  id="send-icon"/>
                    </IconButton>
                </div>
            </div>
    )
}


export default SendBox;




