import React from "react";
import NotAllowed from "./pages/NotAllowed";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login";

function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="notAllowed" element={<NotAllowed />} />
      </Routes>
    </div>
  );
}

export default App;
