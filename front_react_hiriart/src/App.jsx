import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Login from "./Views/Login";
import Users from "./Views/Users";
import Home from "./Views/Home";
import Error from "./Views/404";

function App() {
  return (
    <>
      <Router>
        <nav style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '100%'}}>
          <Link to="/" style={{marginleft:"auto"}}>Home</Link>
          <Link to="/login" style={{marginleft:"auto"}}>Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}/>{/*The "" path redirects to the component*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="*" element={<Error/>}/>{/*If a bad route is given*/}
        </Routes>
      </Router>
    </>
  );

}

export default App;
