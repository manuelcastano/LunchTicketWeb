import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import { BASEURL } from "../constants/Constants";
import { useState } from "react";
import styles from "../css/CardView.module.css";

function CardViewEmployee(props) {
  const [deleted, setDeleted] = useState(false);

  let id = props.employee.username;
  let active = props.active;

  console.log(props.employee);

  console.log("ACTIVE: " + active);

  console.log(props.employee.username);

  const Delete = async () => {
    let id = props.employee.username;
    let path = BASEURL + "/deleteRestaurantEmployee";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
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

  const disable = async () => {
    let path = BASEURL + "/deactivateEmployeeR";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        active = "N";
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const enable = async () => {
    let path = BASEURL + "/activateEmployeeR";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        active = "Y";
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.box}>
      <Box className={styles.smallbox}>
        <button disabled={true}>{props.employee.pers_name}</button>
        <span>{props.employee.username}</span>
      </Box>

      <div className={styles.buttons}>
        {active === "Y" ? (
          <button
            className={styles.button}
            onClick={async () => {
              await disable();
              props.update();
            }}
          >
            {" "}
            Inhabilitar{" "}
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={async () => {
              await enable();
              props.update();
            }}
          >
            {" "}
            Habilitar{" "}
          </button>
        )}
        <button className={styles.deleteBtn}
          onClick={async () => {
            await Delete();
            props.update();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CardViewEmployee;
