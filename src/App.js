import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./Dashboard";
import NotAllowed from "./pages/NotAllowed";
import EmployeesHome from "./components/EmployeesHome";

function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route exact={true} path="/dashboard"  element={< Dashboard/>} /> 
        <Route exact={true} path="/notAllowed"  element={< NotAllowed/>} />   
        <Route exact={true} path="/employees"  element={< EmployeesHome/>} />   
        
      </Routes>
    </div>
  );
}

export default App;
