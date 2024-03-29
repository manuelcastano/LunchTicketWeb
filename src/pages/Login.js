import React from "react";
import Logo from "../imgs/logo.png";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentHome from "./StudentHome";
import RestaurantHome from "./RestaurantHome";
import { Dashboard } from "@mui/icons-material";
import NotAllowed from "./NotAllowed";

function Login() {

  let account = JSON.parse(localStorage.getItem("account"));

  if (account != null) {
    //console.log(account.user.persName);
    const rolesAllowed = account.roles.find(
      (roles) => roles.id === 3 || roles.id === 4
    );
    if (rolesAllowed != null) {
      //console.log("dentro de allowed");
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/notAllowed";
    }
    return;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const navigateApproved = () => {
    navigate("/dashboard", { replace: true });
  };

  const navigateDenied = () => {
    navigate("/notAllowed", { replace: true });
  };

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
          "http://0.tcp.ngrok.io:16541/lunchticket/login",
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

          let account = {
            user: result,
            roles: backResponse,
          };
          localStorage.setItem("account", JSON.stringify(account));

          if (backResponse.length === 0) {
            navigateDenied();
          } else {
            const rolesAllowed = backResponse.find(
              (roles) => roles.id === 3 || roles.id === 4
            );
            if (rolesAllowed != null) {
              navigateApproved();
            } else {
              navigateDenied();
            }
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
