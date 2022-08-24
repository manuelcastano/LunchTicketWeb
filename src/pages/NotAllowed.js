import React from "react";
import "../CSS/AccesDenied.css";
const NotAllowed = () => {
  console.log("HOLAAAAA");
  return (
    <div>
      <h1>Acceso denegado</h1>
      <div>
        <h6>No tienes acceso a esta página</h6>
        <h6>Comunícate con la Oficina de Apoyo Financiero para más información</h6>
      </div>
    </div>
  );
};
export default NotAllowed;
