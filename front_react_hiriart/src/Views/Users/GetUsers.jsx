import {React, useEffect, useState } from "react";
import axios from "axios";

function GetUsers(){
    const urlGet = 'https://localhost:7017/api/users'
    const [users, setUsers] = useState(null);{/*users is empty by default */}

    let content = null

    {/*Request only runs when url changes*/}
    useEffect(() => {
        axios.get(urlGet)
            .then(response => {
                return(
                    setUsers(response.data)
                )
            })
    }, [urlGet])   

    if(users){
        content =
            <div className="container">
                <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                    <h1>Get users</h1>
                </div>
                <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                    <h1>{users[0].email}</h1>
                </div>
            </div>
    }
    
    return(
        <div>
            {content}
        </div>
    )
}

export default GetUsers;