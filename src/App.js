import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotAllowed from "./pages/NotAllowed";
import EmployeesHome from "./components/EmployeesHome";
import { useState } from "react";

function App() {
  const [restaurant, setRestaurant] = useState({});

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route exact={true} path="/dashboard" element={<Dashboard />} />
        <Route exact={true} path="/notAllowed" element={<NotAllowed />} />
        <Route
          path="/employees"
          state={{restaurant}}
          restaurant={restaurant}
          element={<EmployeesHome />}
        />
      </Routes>
    </div>
  );
}

export default App;
