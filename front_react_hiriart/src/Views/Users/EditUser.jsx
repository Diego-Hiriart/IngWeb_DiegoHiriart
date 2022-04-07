import {React, useState, Component } from "react";
import {User} from "../../Models/User.ts"

function EditUser(){
    const urlPut = 'https://localhost:7017/api/users';
    const urlGet = 'https://localhost:7017/api/users/full-match/';
    const [user, setUser] = useState(new User);
    const [searchParam, setSearchParam] = useState(//"searchParam" object
        {
            email: ''//property
        }
    )
    const [success, setSuccess] = useState(null);

    //Function to send GET request
    function search(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(urlGet+searchParam.email)
            .then(res => res.json())
            .then(json => setUser(json));
    }

    //Function to send PUT request
    function edit(){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(urlPut, requestOptions)
            .then(res => {
                if(res.ok){
                    setSuccess(true)
                }else{
                    setSuccess(false)
                }
            });
    } 

    function getInput(evt){
        const value = evt.target.value //The value that input has
        setUser({
            ...user,//A single thing with many properties has to be spread (...user), that is spread the existing user into the new one, merging them
            [evt.target.name]: value//The name the input has (same as the property from state we want ot link it to) is the value of the input
        });
    }

    function getSearchInput(evt){
        const value = evt.target.value //The value that input has
        setSearchParam({
            ...searchParam,//A single searchParam with many properties has to be spread (...searchParam), that is spread the existing searchParam into the new one, merging them
            [evt.target.name]: value//The name the input has (same as the property from state we want ot link it to) is the value of the input
        });
    }

    const inputStyle = {'margin':'2px'};

    const content =
        <div className="container">
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width: '70%'}}>
                <h1>Edit user</h1>
                <p>Input the email you are searching for (full match only)</p>                  
            </div>
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width: '70%'}}>
                <input type="text" name="email" value={searchParam.email} onChange={getSearchInput} placeholder="email" style={{margin:'2px'}}></input>
                <button style={{margin:'2px'}} onClick={search}>Search</button>
            </div>
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width:'10%'}}>
                {/*Input needs name to be the same as the property in searchParam we want ot link it to, searchParam value makes it a controlled component, 
                onChange allows to get handle the value and get it every time the is a change*/}
                <input type="text" name="Email" value={user.Email} onChange={getInput} placeholder="email" style={inputStyle}></input>
                <input type="text" name="Password" value={user.Password} onChange={getInput} placeholder="password" style={inputStyle}></input>
                <input type="text" name="Username" value={user.Username} onChange={getInput} placeholder="username" style={inputStyle}></input>
                <button style={inputStyle} onClick={edit}>Edit</button>
                <br/>                
            </div>
            <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                {success != null &&
                    <h5>Result: <b>{success ? "Modifications successfull" : "An error ocurred"}</b></h5>
                }     
            </div>
        </div>
    
    return(
        <div>
            {content}
        </div>
    )
}

export default EditUser;