import React from "react";
import {useNavigate} from "react-router-dom"

function UsersMenu(){
    let navigate = useNavigate();
    return(
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                <h1>Users CRUD operations</h1>
            </div>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                <button onClick={() => {navigate("/users/get")}}>Get all users</button>
                <button onClick={() => {navigate("/users/search")}}>Search for a user</button>
                <button onClick={() => {navigate("/users/create")}}>Create new user</button>
                <button onClick={() => {navigate("/users/edit")}}>Edit user</button>
                <button onClick={() => {navigate("/users/delete")}}>Delete user</button>
            </div>
        </div>
    );
}

export default UsersMenu;