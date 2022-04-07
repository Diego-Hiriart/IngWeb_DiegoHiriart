import {React, useState } from "react";

function SearchUsers(){
    const urlGet = 'https://localhost:7017/api/users/'
    const [users, setUsers] = useState(null);{/*users is empty by default */}
    const [state, setState] = useState(//"state" object
        {
            email: ''//property
        }
    )

    //Function to send GET request
    function search(){
        fetch(urlGet+state.email)
            .then(res => res.json())
            .then(json => setUsers(json));
    } 

    function getInput(evt){
        const value = evt.target.value //The value that input has
        setState({
            ...state,//A single state with many properties has to be spread (...state), that is spread the existing state into the new one, merging them
            [evt.target.name]: value//The name the input has (same as the property from state we want ot link it to) is the value of the input
        });
    }

    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};

    const content =
        <div className="container">
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width: '70%'}}>
                <h1>Search users</h1>
                <p>Input the email you are searching for (supports partial match)</p>                  
            </div>
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width:'10%'}}>
                {/*Input needs name to be the same as the property in state we want ot link it to, state value makes it a controlled component, 
                onChange allows to get handle the value and get it every time the is a change*/}
                <input type="text" name="email" value={state.email} onChange={getInput} placeholder="email" style={{margin:'2px'}}></input>
                <button style={{margin:'2px'}} onClick={search}>Search</button>
                <br/>                
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
                        {/* the {coondition && stuff} shows stuff only if the condition is met*/}
                        {users &&
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
    
    return(
        <div>
            {content}
        </div>
    )
}

export default SearchUsers;