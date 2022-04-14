import {React} from "react";
import {useNavigate} from "react-router-dom"

function Logout(){
    let navigate = useNavigate();
    localStorage.removeItem("authToken")
    console.log(JSON.parse(localStorage.getItem("authToken")))
    const content =
    <div className="container">
        <br></br>
        <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%', flexDirection:'column'}}>
            <h5><b>You have logged out</b></h5>
            <button onClick={() => {navigate("/login")}}>Log in</button>
        </div>
    </div>

    return(
        <div>
            {content}
        </div>
    )
}

export default Logout;