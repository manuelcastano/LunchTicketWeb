import React from "react";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState, useEffect } from "react";
import { BASEURL } from "../constants/Constants";
import styles from "../css/RestaurantHome.module.css";
import CardViewEmployee from "./CardViewEmployee.js";
import listStyles from "../css/List.module.css";
import { useLocation } from "react-router-dom";

function EmployeesHome() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  const location = useLocation();
  const nit = location.state.nit;
  console.log("NIT!!!!: " + location.state.nit);

  const [message, setMessage] = useState("");

  const [all, setAll] = useState([]);

  const handleClick = async () => {
    setMessage("");
    if (
      !(
        employeeLastName === "" ||
        employeeId === "" ||
        employeeName === "" ||
        employeePassword === ""
      )
    ) {
      try {
        const response = await fetch(
          BASEURL + "/lunchticket/addRestaurantEmployee",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nit: nit,
              name: employeeName,
              lastName: employeeLastName,
              document: employeeId,
              password: employeePassword,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          const backResponse = await response.json();
          console.log(backResponse.response);
          //Aviso de que se creo o no
          setMessage(backResponse.message);
          getAll();
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setMessage("Por favor llena todos los campos");
    }
  };

  const getAll = async () => {
    try {
      const response = await fetch(BASEURL + "/lunchticket/getEmployees", {
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
        const backResponse = await response.json();
        setAll(backResponse);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const renderList = () => {
    return (
      <Box className={listStyles.box}>
        {all.map((option) => {
          console.log("Employee: " + option.userID.username);
          return (
            <CardViewEmployee
              key={option.id}
              employee={option.userID}
            ></CardViewEmployee>
          );
        })}
      </Box>
    );
  };

  return (
    <Box className={styles.bigBox}>
      <Box className={styles.smallBox}>
        <Typography variant="h4" align="center" sx={{ color: "#999", my: 2 }}>
          Registra un empleado
        </Typography>
        <Box>
          <TextField
            id="outlined-basic"
            label="ID del empleado"
            variant="outlined"
            size="small"
            name="employeeId"
            onChange={(e) => {
              setEmployeeId(e.target.value);
            }}
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Nombre del empleado"
            variant="outlined"
            size="small"
            name="employeeName"
            onChange={(e) => {
              setEmployeeName(e.target.value);
            }}
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Apellido del empleado"
            variant="outlined"
            size="small"
            name="employeeLastName"
            onChange={(e) => {
              setEmployeeLastName(e.target.value);
            }}
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Contraseña del empleado"
            variant="outlined"
            size="small"
            name="employeePassword"
            onChange={(e) => {
              setEmployeePassword(e.target.value);
            }}
          />
        </Box>

        <Button
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<HowToRegIcon />}
        >
          Registrar
        </Button>
        <Typography my={5} variant="subtitle1" color={"#BA0606"}>
          {message}
        </Typography>
        <Box>
          <Typography my={5} variant="h5" color={"#999"}></Typography>
          <Typography my={5} variant="h5" color={"#999"}>
            Empleados
          </Typography>
        </Box>
        {renderList()}
      </Box>
    </Box>
  );
}

export default EmployeesHome;
