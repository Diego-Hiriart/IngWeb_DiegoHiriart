import {React, useState, createRef } from "react";

function EditUser(){
    const urlPut = 'https://localhost:7017/api/users';
    const urlGet = 'https://localhost:7017/api/users/full-match/';
    const [user, setUser] = useState(null);
    let [userPut, setuserPut] = useState(null);
    const [searchParam, setSearchParam] = useState(//"searchParam" object
        {
            email: ''//property
        }
    )
    const [successGet, setSuccessGet] = useState(null);
    const [successPut, setSuccessPut] = useState(null);
    const searchInput = createRef();
    const emailInput = createRef();
    const passwordInput = createRef();
    const usernameInput = createRef();

    //Function to send GET request
    function search(){
        setSearchParam({email : searchInput.current.value})
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };     
        fetch(urlGet+searchParam.email, requestOptions)
            .then(res => {
                if(res.ok){
                    res.json()
                    .then(json => setUser(json));
                    setSuccessGet(true);
                    setSuccessPut(null);//Reset so it doesnt show the old result message                             
                }else{
                    setSuccessGet(false);
                    setSuccessPut(null);//Reset so it doesnt show the old result message
                }
            }
        )
    }

    //Function to send PUT request
    function edit(){  
        userPut = {
            UserID : user[0].userID,
            Email : emailInput.current.value,
            Password: passwordInput.current.value,
            Username : usernameInput.current.value
        };
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userPut)
        };
        fetch(urlPut, requestOptions)
            .then(res => {
                if(res.ok){
                    setSuccessPut(true);
                    setUser(null);//Reset
                    setuserPut(null);//Reset
                }else{
                    setSuccessPut(false)
                }
            });
    } 

    function getInput(evt){
        const value = evt.target.value //The value that input has
        setUser({
            ...user,//A single thing with many properties has to be spread (...user), that is spread the existing state into the new one, merging them
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
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width: '40%'}}>
                <input type="text" name="email" ref={searchInput} value={searchParam.email} onChange={getSearchInput} placeholder="email" style={inputStyle}></input>              
            </div>
            <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width: '10%'}}>
                <button style={inputStyle} onClick={search}>Search</button>
                <br/>
            </div>
                {successGet == true && user != null ?
                    <>
                    <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width:'40%'}}>
                        {/*Input needs name to be the same as the property in searchParam we want ot link it to, searchParam value makes it a controlled component, 
                        onChange allows to get handle the value and get it every time the is a change*/} 
                        <input type="text" name="Email" ref={emailInput} defaultValue={user[0].email} value={user.Email} onChange={getInput} placeholder="email" style={inputStyle}></input>
                        <input type="text" name="Password" ref={passwordInput} defaultValue={user[0].password} value={user[0].Password} onChange={getInput} placeholder="password" style={inputStyle}></input>
                        <input type="text" name="Username" ref={usernameInput} defaultValue={user[0].username} value={user[0].Username} onChange={getInput} placeholder="username" style={inputStyle}></input>
                    </div> 
                    <div style={{display: 'flex', 'flexDirection':'column',  justifyContent:'normal', alignItems:'normal', width:'10%'}}>                       
                        <button style={inputStyle} onClick={edit}>Edit</button>
                        <br/>                
                    </div>           
                    </>
                :   
                    <h5><b>{successGet != null && successGet == false ? "The user you want to edit was not found" : ""}</b></h5>                  
                }                                        
            <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                {successPut != null &&
                    <h5>Result: 
                        <b>{successPut ? "Modifications successfull" : "An error ocurred"}</b>
                    </h5>
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