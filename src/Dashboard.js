import React from 'react';
import { BrowserRouter as Router,  Route } from "react-router-dom";
import Sidebar from '../src/components/Sidebar';
import StudentHome from './pages/StudentHome'
import './App.css'
import { Routes } from 'react-router-dom';
import RestaurantHome from './pages/RestaurantHome';

function Dashboard() {
  return (
<div className="dflex" >
  <div className='dflex2'>
      <Router>
        <Sidebar/> 
        <Routes>
              <Route exact={true} path="/"  element={< StudentHome/>} />      
              <Route exact={true} path="/restaurant"  element={< RestaurantHome/>} />        
        </Routes>  
        </Router>
  </div>
  </div>
  );
}
export default Dashboard;