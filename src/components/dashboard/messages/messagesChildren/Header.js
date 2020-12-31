import React, { useEffect, useState,useContext } from 'react';
import {Context} from '../../../Context'
import IconButton from "@material-ui/core/IconButton";
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axiosWithAuth from '../../../axiosWithAuth';

function Header(){
    const receiver=useContext(Context).receiver;
    const setMessageBox=useContext(Context).setMessageBox;
    useEffect(()=>{
        axiosWithAuth().post(`/api/messages/my-messages`,{from:localStorage.getItem('receiver-username'),to:localStorage.getItem('username')}).then(result=>{
            if(result.data.error_message){
                console.log(result.data.error_message)
            }else{
                setMessageBox(result.data)
            }
        })
    },[receiver])
        return (
                <div>
                    <div className="profile-header">
                        <div className="profile_details">
                            <div className="icon"></div>
                            <div className="name"><h1>{receiver}</h1></div>
                        </div>
                        <div className="comm-icons">
                            <IconButton >
                                <SearchIcon/>
                            </IconButton>
                            <IconButton >
                                <CallIcon/>
                            </IconButton>
                            <IconButton >
                                <VideocamIcon/>
                            </IconButton>
                            <IconButton >
                                <MoreVertIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            )
}

export default Header;