import logo from './applogo.png';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="Login">
      <img id="logo" src={logo}/>
      <p>Cédula</p>
      <input id="inputCedula" type="text" placeholder="Número de cédula"/>
      <p>Contraseña de banner</p>
      <input id="inputContrasena" type="password" placeholder="Contraseña"/>
      <br/>
      <button id="loginButton">Iniciar sesión</button>
      <br/>
      <pr id="badLogin" >Credenciales incorrectas</pr>
    </div>
  );
}

export default App;
