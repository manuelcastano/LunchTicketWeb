import React from 'react';
import { BrowserRouter as Router, Switch, Route ,BrowserRouter} from "react-router-dom";
import Sidebar from '../src/components/Sidevar';
import Home from '../src/pages/Home'
import './App.css'
import { Routes } from 'react-router-dom';




function Dashboard() {
  return (
<div className="dflex" >

  <div className='dflex2'>
      <Router>
        <Sidebar/> 
        
        <Routes>
              <Route exact={true} path="/"  element={<Home />} />
        </Routes>  
        </Router>
  </div>
  
  </div>
    
  );
}
  
  export default Dashboard;