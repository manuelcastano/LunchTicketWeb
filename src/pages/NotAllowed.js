import React from "react";
import "../css/AccesDenied.css";
import Login from "./Login";
const NotAllowed = () => {


  const onClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Acceso denegado</h1>
      <div>
        <h6>No tienes acceso a esta página</h6>
        <h6>Comunícate con la Oficina de Apoyo Financiero para más información</h6>
        <button onClick={onClick}>Cerrar Sesión</button>
      </div>
    </div>
  );
};
export default NotAllowed;
