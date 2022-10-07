import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import { BASEURL } from "../constants/Constants";
import { useState } from "react";
import styles from "../css/CardView.module.css";
import { useNavigate } from "react-router-dom";

function CardView(props) {
  const [deleted, setDeleted] = useState(false);
  const [nit, setNit] = useState(props.resturant.nit);
  const [name, setName] = useState(props.resturant.name);

  let active = (props.resturant.active);

  const navigate = useNavigate();

  const Delete = async () => {
    let path = BASEURL + "/deleteRestaurant";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nit,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        setDeleted(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const disable = async () =>{
    let path = BASEURL + "/deactivateRestaurant";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nit,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        active='N';
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  const enable = async () =>{
    let path = BASEURL + "/activateRestaurant";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nit,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        active='Y';
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const employees = () => {
    navigate("/employees", {
      state: {
        nit: nit,
        name: name,
      },
    });
  };

  return (
    <div className={styles.box}>
      <Box className={styles.smallbox}>
        <button onClick={employees}>
          {name}
        </button>
        <span >
          {nit}
        </span>
      </Box>
      {active === ('Y') ?
      <button className={styles.button} onClick={async () => {
        await disable();
        props.update();
      }}
      > Inhabilitar </button>
      :
      <button className={styles.button} onClick={async () => {
        await enable();
        props.update();
      }}> Habilitar </button>}
      <button className={styles.deleteBtn}
          onClick={async () => {
            await Delete();
            props.update();
          }}
        >
          Eliminar
        </button>
      </div>
  );
}

export default CardView;
