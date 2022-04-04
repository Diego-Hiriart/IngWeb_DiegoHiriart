import React from "react";

function Login(){
    return(
        <div>
            <input type="text" placeholder="username"></input>
            <input type="password" placeholder="password"></input>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: '70vh'}}>
                <button>Login</button>
                <button>Forgot Password?</button>
            </div>     
        </div>
    );
}

export default Login;