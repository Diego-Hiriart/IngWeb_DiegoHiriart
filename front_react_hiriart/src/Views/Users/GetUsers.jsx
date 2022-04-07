import {React, useEffect, useState } from "react";

function GetUsers(){
    const urlGet = 'https://localhost:7017/api/users'
    const [users, setUsers] = useState(null);{/*users is empty by default */}

    //Function to send GET request
    const getAll = () => {
        fetch(urlGet)
            .then(res => res.json())
            .then(json => setUsers(json));
    }

    {/*Request only runs when url changes*/}
    useEffect(() => {
        getAll();
    }, [urlGet])   

    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};

    let content = 
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                <h1>Get users</h1>
            </div>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={tableStyle}>
                            <th style={tableStyle}>ID</th>
                            <th style={tableStyle}>Email</th>
                            <th style={tableStyle}>Password</th>
                            <th style={tableStyle}>Username</th>
                        </tr>
                    </thead>
                    <tbody>                                                
                    </tbody>
                </table>
            </div>
        </div>
    
    if(users){
        content =
            <div className="container">
                <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                    <h1>Get users</h1>
                </div>
                <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableStyle}>
                                <th style={tableStyle}>ID</th>
                                <th style={tableStyle}>Email</th>
                                <th style={tableStyle}>Password</th>
                                <th style={tableStyle}>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user.userID} style={tableStyle}>
                                        <td style={tableStyle}>{user.userID}</td>
                                        <td style={tableStyle}>{user.email}</td>
                                        <td style={tableStyle}>{user.password}</td>
                                        <td style={tableStyle}>{user.username}</td>
                                    </tr>
                                ))
                            }                            
                        </tbody>
                    </table>
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