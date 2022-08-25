import React from "react";
import NotAllowed from "./pages/NotAllowed";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import RestaurantHome from './pages/RestaurantHome';
import StudentHome from './pages/StudentHome'
import Dashboard from "./Dashboard";
import Sidebar from '../src/components/Sidebar';

function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="notAllowed" element={<NotAllowed />} />
        <Route exact={true} path="/student"  element={< StudentHome/>} />      
        <Route exact={true} path="/restaurant"  element={< RestaurantHome/>} />  
        <Route exact={true} path="/dashboard"  element={< Dashboard/>} />  
      </Routes>
    </div>
  );
}

export default App;
