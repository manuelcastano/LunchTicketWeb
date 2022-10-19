import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import { BASEURL } from "../constants/Constants";
import { useState } from "react";
import styles from "../css/CardView.module.css";

function CardViewEmployee(props) {
  const [deleted, setDeleted] = useState(false);

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
    }
  };

  return (
    <div className={styles.box}>
      <Box className={styles.smallbox}>
        <button disabled={true}>{props.employee.pers_name}</button>
        <span>{props.employee.username}</span>
      </Box>
      <div className={styles.deleteButton}>
        <button
          onClick={async () => {
            await Delete();
            props.onDelete();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CardViewEmployee;
