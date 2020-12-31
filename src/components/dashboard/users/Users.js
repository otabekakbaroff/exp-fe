import React from 'react';
import MyProfile from './usersChildren/MyProfile';
import MyContacts from './usersChildren/MyContacts';
import UserSearch from './usersChildren/UserSearch';

function Users(){
    return(
        <div className="users">
            <MyProfile/>
            <UserSearch/>
            <MyContacts/> 
        </div>
    )
}


export default Users