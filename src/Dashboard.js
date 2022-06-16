import React from 'react';
import { BrowserRouter as Router,  Route } from "react-router-dom";
import Sidebar from '../src/components/Sidevar';
import StudentHome from './pages/StudentHome'
import './App.css'
import { Routes } from 'react-router-dom';

function Dashboard() {
  return (
<div className="dflex" >
  <div className='dflex2'>
      <Router>
        <Sidebar/> 
        <Routes>
              <Route exact={true} path="/"  element={< StudentHome/>} />             
        </Routes>  
        </Router>
  </div>
  </div>
  );
}
export default Dashboard;