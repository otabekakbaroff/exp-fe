import React,{useContext,useState} from 'react'
import {Context} from '../../../Context'


function ChatBox(){
    const messagebox=useContext(Context).messagebox;
    const socket=useContext(Context).socket;
    useState(()=>{
        socket.on('private',function(data){
            console.log(data)
        })
    },[socket])
    return(
        <div className="chat-box">
            {messagebox.map(item=>(
                <div key={Math.floor(Math.random()*99999999)} className={`${item.from === localStorage.getItem('username') ? 'sender':'receiver'}`}>
                    <p>{item.message}</p>
                </div>
            ))}
        </div>
    )
}

export default ChatBox;