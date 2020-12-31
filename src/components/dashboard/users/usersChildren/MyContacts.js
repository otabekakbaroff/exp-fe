import React, { useEffect , useContext } from 'react';
import axiosWithAuth from '../../../axiosWithAuth';
import {Context} from '../../../Context'
let friendsList = new Set();

function MyContacts(){
    const setReceiver = useContext(Context).setReceiver;
    const socket = useContext(Context).socket;
    const users = useContext(Context).users
    const setUsers = useContext(Context).setUsers
    const connections = useContext(Context).connections;
    const setConnections = useContext(Context).setConnections;

    useEffect(()=>{
        axiosWithAuth().get(`/api/connections/${localStorage.getItem('username')}/friends-list`).then(result=>{
            console.log(result.data)
            for(let i = 0; i<result.data.length; i++){
                // console.log(result.data[i].username)
                friendsList.add(result.data[i].username)
            }
            setUsers(result.data)
        }).catch(error=>{
            console.log(error)
        },[])
        socket.on('user-search', function(data){
            console.log(data)
            // console.log(friendsList)
            setConnections(data)
        })
    },[socket])


    function add_friend(e){
        axiosWithAuth().post(`/api/connections/send-friend-request`, {from:localStorage.getItem('username'),to:e.target.name}).then(res=>{
            e.target.parentElement.style = "display:none"
        })
    }


    if(connections.length !== 0){
        return(
            <div className="user-collection">
                    {connections.map(item=>(
                        <div key={Math.floor(Math.random()*99999999)}>
                            {(() => {
                                if (!(friendsList.has(item.username))) {
                                    return (
                                        <div className="user-collection-item" >
                                            <div className="user-icon"></div>
                                            <div>{item.username}</div>
                                            <button className="add-friend" onClick={add_friend} name={item.username}>Add a friend</button>
                                        </div> 
                                    )
                                } 
                            })()}
                        </div>
                    ))}
                </div>
        )
    }else{
        return(
            <div className="user-collection">
                    {users.map(item=>(
                        <div className="user-collection-item" key={Math.floor(Math.random()*99999999)} onClick={()=>{setReceiver(item.username);localStorage.setItem('receiver-username',item.username)}}>
                            <div className="user-icon"></div>
                            <div>{item.username}</div>
                        </div>
                    ))}
                    
                </div>
        )
    }
}



export default MyContacts














