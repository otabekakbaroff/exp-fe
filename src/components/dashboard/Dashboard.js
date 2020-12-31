import React,{useEffect,useState} from 'react'
import Users from './users/Users';
import Messages from './messages/Messages'
import {Context} from '../Context'
import io from "socket.io-client"
const socket = io("http://localhost:5000")

function Dashboard(){
    const [receiver, setReceiver] = useState(localStorage.getItem('receiver-username'))
    const [connections,setConnections] = useState([])
    const [users,setUsers] = useState([])
    const [messagebox, setMessageBox] = useState([]);

    useEffect(()=>{
        socket.emit('user-info', localStorage.getItem('username'))
        socket.on('confirm', function(data){
            console.log(data)
        })
        socket.on('private',function(data){
            console.log(data)
        })
        socket.on('error',function(data){
            console.log(data)
        })
    },[socket])

    return(
        <div className="dashboard">
            <Context.Provider value={{socket,receiver, setReceiver,connections,setConnections,users,setUsers,messagebox,setMessageBox}}>
                <Users/>
                <Messages/>
            </Context.Provider> 
        </div>
    )
}

export default Dashboard




