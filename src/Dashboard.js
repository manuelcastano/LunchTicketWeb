import React from 'react';
import { BrowserRouter as Router, Switch, Route ,BrowserRouter} from "react-router-dom";
import Sidebar from '../src/components/Sidevar';
import Home from '../src/pages/Home'

import { Routes } from 'react-router-dom';

function Dashboard() {
  return (
    <Router>

      <Sidebar/>
      
         <Routes>
         
           <Route path="/"  element={<Home />} />
        </Routes>
  
    </Router>
  );
}
  
  export default Dashboard;
  