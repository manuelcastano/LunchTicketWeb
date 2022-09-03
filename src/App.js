import React from "react";
import NotAllowed from "./pages/NotAllowed";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import RestaurantHome from './pages/RestaurantHome';
import StudentHome from './pages/StudentHome'
import Dashboard from "./Dashboard";

function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route exact={true} path="/dashboard"  element={< Dashboard/>} />  
      </Routes>
    </div>
  );
}

export default App;
