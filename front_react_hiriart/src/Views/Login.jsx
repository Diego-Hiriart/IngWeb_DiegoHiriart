import React from "react";

function Login(){
    return(
        <div className="container">
            <br></br>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%', flexDirection:'column'}}>
                <input type="text" placeholder="username"></input>
                <input type="password" placeholder="password"></input>                    
            </div>
            <br></br>
            <div style={{display: 'flex',  justifyContent:'space-around', alignItems:'center', width: '70%'}}>
                <button>Login</button>
                <button>Forgot Password?</button>
            </div>
        </div>
    );
}

export default Login;