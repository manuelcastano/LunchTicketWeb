import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import { BASEURL } from "../constants/Constants";
import { useState } from "react";
import styles from "../css/CardView.module.css";
import EmployeesHome from "./EmployeesHome";
import { useNavigate } from "react-router-dom";

function CardView(props) {
  const [deleted, setDeleted] = useState(false);
  const [nit, setNit] = useState(props.resturant.nit);
  const [name, setName] = useState(props.resturant.name);

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

export default CardView;
