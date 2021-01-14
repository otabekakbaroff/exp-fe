import React, { useContext, useState } from 'react'
import SendIcon from '@material-ui/icons/Send';
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import MicIcon from '@material-ui/icons/Mic';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { Context } from '../../../Context'

function SendBox() {
    const [selectedFile, setSelectedFile] = useState({ selectedFile: '' });
    const [message, setMessage] = useState({
        username: localStorage.getItem('username'),
        receiver_username: '',
        message: '',
        // file: '',y

        date: ''
    });
    const socket = useContext(Context).socket
    function handleChange(e) {
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        })
    }
    function send(e) {
        e.preventDefault()
        // console.log("E", e)
        if (message.message) {
            socket.emit('private', { ...message, receiver_username: localStorage.getItem('receiver-username'), date: Date.now() })
            window.location = '/dashboard';
        }
    }


    function onFileChange(event) {
        // Update the state 
        setSelectedFile({ selectedFile: event.target.files[0] });

    };


    function readThenSendFile(data) {

        console.log('hit')
        var reader = new FileReader();
        reader.onload = function (evt) {
            console.log('reader load')
            var msg = {};
            // msg.username = username;
            msg.file = evt.target.result;
            msg.fileName = data.name;

            console.log('Emitting message;', msg)

            socket.emit('base64 file', { ...msg, receiver_username: localStorage.getItem('receiver-username'), date: Date.now() });
        };
        // reader.readAsDataURL(data);
    }


    function onFileUpload(e) {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append('myFile',
            selectedFile
        );



        console.log('selected file:', selectedFile)

        var data = e.originalEvent.target.files[0];
        readThenSendFile(data);


    }


    return (
        <div className="send-box">
            <IconButton >
                <PhotoCameraIcon />
            </IconButton>
            <IconButton >
                <PhotoLibraryIcon onClick={onFileUpload, readThenSendFile} />
                <input type='file' onChange={onFileChange} />
            </IconButton>
            <IconButton >
                <MicIcon />
            </IconButton>
            <TextField id="text" className="textareawidth" label="Type here..." variant="outlined" onChange={handleChange} name="message" InputProps={{
                endAdornment: (
                    <InputAdornment>
                        <IconButton >
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }} />
            <div className="send-button-box">
                <IconButton type="Submit" id="send-button" onClick={send}>
                    <SendIcon type="Submit" id="send-icon" />
                </IconButton>
            </div>
        </div>
    )
}





export default SendBox;




