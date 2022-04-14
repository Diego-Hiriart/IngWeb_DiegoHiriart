import {React, useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from "./Views/Login";
import Logout from "./Views/Logout";
import UsersMenu from "./Views/Users/UsersMenu";
import GetUsers from "./Views/Users/GetUsers";
import SearchUsers from "./Views/Users/SearchUsers";
import CreateUser from "./Views/Users/CreateUser";
import EditUser from "./Views/Users/EditUser";
import DeleteUser from "./Views/Users/DeleteUser";
import Home from "./Views/Home";
import Error from "./Views/404";

function App() {
  const urlCheckLogin = 'https://localhost:7017/api/auth/checklogin'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Check if the user is logged in as soon as this page is entered
  useEffect(() => {
    checklogin();
  }, [])  

//Checks if the token currently stored is valid
function checklogin(){
    console.log(JSON.parse(localStorage.getItem("authToken")))
    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization':"bearer "+JSON.parse(localStorage.getItem("authToken"))},
    };
    fetch(urlCheckLogin, requestOptions)
        .then(res => {
            if(res.ok){//If not ok, token must be invalid
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        });
  }

  return (
    <>
      <Router>
        <nav style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '100%'}}>
          <Link to="/" style={{marginleft:"auto"}}>Home</Link>
          {isLoggedIn === false ? 
            <Link to="/login" style={{marginleft:"auto"}}>Log in</Link>
            :
            <Link to="/logout" style={{marginleft:"auto"}}>Log out</Link>
          }
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>{/*The "" path redirects to the component*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/users" element={<UsersMenu/>}/>
          <Route path="/users/get" element={<GetUsers/>}/>
          <Route path="/users/search" element={<SearchUsers/>}/>
          <Route path="/users/create" element={<CreateUser/>}/>
          <Route path="/users/edit" element={<EditUser/>}/>
          <Route path="/users/delete" element={<DeleteUser/>}/>
          <Route path="*" element={<Error/>}/>{/*If a bad route is given*/}
        </Routes>
      </Router>
    </>
  );

}

export default App;
