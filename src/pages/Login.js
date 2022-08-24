import React from "react";
import Logo from "../imgs/logo.png";
import "../App.css"
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  const [allowed, setAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUser = (event) => {
    setUsername(event.target.value);
  };
  /* Arrow function que hace esto mismo
  function onUser(event) {
    setUsername(event.target.value);
  }
  */
  const onPass = (event) => {
    setPassword(event.target.value);
  };

  const navigateTo = () => {
    if (allowed) {
    } else {
      navigate("/notAllowed", { replace: true });
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    setErr(null);

    try {
      const response = await fetch(
        "https://www.icesi.edu.co/uccareapi/auth/institutions/1/authentication/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        const result = await response.json();

        console.log("result is: ", result);
        let json = JSON.stringify(result);
        console.log(json);

        const postResult = await fetch(
          "http://2.tcp.ngrok.io:12535/lunchticket/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
          }
        );
        if (!postResult.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          //Recibir el usuario con un array que contenga sus roles
          //Cambiar la página con route de acuerdo al rol que tenga
          const backResponse = await postResult.json();

          console.log("backResponse is: ", backResponse);
          let json = JSON.stringify(backResponse);
          console.log(json);
          let role = JSON.parse(json);
          var found = false;
          console.log(role);
          if (role.length == 0) {
            setAllowed(false);
            navigateTo();
          } else {
            /*for(i=0;i<role.lenght && !found;i++){
              if(role[i] == ""){
  
              }
            }*/
          }
        }

        //Destructuring del objeto. Saco estos atributos
        //const { persName, persLastname, persIddocument } = result;

        //Creo un objeto con dichos atributos
        /*const out = {
          persName,
          persLastname,
          persIddocument,
        };*/

        //Falta hacer un POST al BACKEND
        // A la tabla de usuarios
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="Login">
      <img src={Logo} />
      <p>Cédula</p>
      <input onChange={onUser} type="text" placeholder="Número de cédula" />
      <p>Contraseña de banner</p>
      {/*{allowed && <Navigate to='/notAllowed'/>}*/}
      <input onChange={onPass} type="password" placeholder="Contraseña" />
      {isLoading && <p>Cargando</p>}
      {err && (
        <p class="text-danger text-center fw-bold">
          Usuario o Contraseña incorrectos
        </p>
      )}
      <br />
      <button class="btn btn-primary" onClick={handleClick}>
        Iniciar sesión
      </button>
      <br />
    </div>
  );
}

export default Login;
