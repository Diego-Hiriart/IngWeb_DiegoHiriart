import {React, useState, Component } from "react";
import {User} from "../../Models/User.ts"

function DeleteUser(){
    const urlDel = 'https://localhost:7017/api/users/';
    const [searchParam, setSearchParam] = useState(//"searchParam" object
        {
            id: ''//property
        }
    )   
    const [successDel, setSuccessDel] = useState(null);

    //Function to send DELETE request
    function deltUser(){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(urlDel+searchParam.id, requestOptions)
            .then(res => {
                if(res.ok){               
                    setSuccessDel(true);
                }else{
                    setSuccessDel(false);
                }
            }) 
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
                <h1>Delete user</h1>
                <p>Input the ID of the user you want to delete</p>                  
            </div>
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width: '40%'}}>
                <input type="text" name="id" value={searchParam.id} onChange={getSearchInput} placeholder="user ID" style={inputStyle}></input>              
            </div>
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width: '10%'}}>
                <button style={inputStyle} onClick={deltUser}>Delete</button>
                <br/>
            </div>
            {successDel == true ? 
                <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width:'40%'}}>
                    <h5><b>User deleted</b></h5>                              
                </div>                
                : 
                    <h5><b>{successDel != null && "The user you want to delete was not found"}</b></h5>
            }         
        </div>
    
    return(
        <div>
            {content}
        </div>
    )
}

export default DeleteUser;