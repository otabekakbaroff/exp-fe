import React,{useEffect,useContext, useState} from 'react'
import {Context} from '../../Context'
import Header from './messagesChildren/Header'
import Chatbox from './messagesChildren/Chatbox'
import Sendbox from './messagesChildren/Sendbox'


function Messages(){
    if(localStorage.getItem('receiver-username') !== 'null'){
        return(
            <div className="messages">
                <Header/>
                <Chatbox/>
                <Sendbox/>
            </div>
        )
    }else{
        return(
            <div className="messages">
                <p>Hello, welcome to our chat app, please search for someone and start connecting!</p>
            </div>
        )
    }
}

export default Messages


    // const [activeButton,setActiveButton] = useState([]);
    // const socket = useContext(Context).socket;

    // function send(){
    //     let chatbox = document.querySelector(".chat-box")
    //     let message = document.querySelector("#text").value
    //     socket.emit('private',{from:localStorage.getItem('username'),to:localStorage.getItem('receiver-username'),message:message,date:Date.now()})
    //     let textnode = document.createElement("p");
    //     textnode.innerHTML = message;
    //     textnode.classList.add('true')
    //     chatbox.appendChild(textnode);
    //     chatbox.scrollTo(0, chatbox.scrollHeight);
    // }

    // useEffect(()=>{
    //     let chatbox = document.querySelector(".chat-box")
    //     socket.on('private', function(data){
    //         console.log(data)
    //         let textnode = document.createElement("p");
    //         textnode.innerHTML = data.message;
    //         textnode.classList.add('false')
    //         chatbox.appendChild(textnode);
    //         chatbox.scrollTo(0, chatbox.scrollHeight);
    //     })
    // },[socket])

    // const handleChange = (e) =>{
    //     if(e.target.value){
    //         setActiveButton({fill: "#478dff",transform: `rotate(-45deg)`})
    //     }else{
    //         setActiveButton({})
    //     }
    // }

