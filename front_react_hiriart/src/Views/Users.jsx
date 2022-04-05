import React from "react";

function Users(){
    return(
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                <h1>Users CRUD operations</h1>
            </div>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                <button>Get all users</button>
                <button>Search for a user</button>
                <button>Create new user</button>
                <button>Edit user</button>
                <button>Delete user</button>
            </div>
        </div>
    );
}

export default Users;