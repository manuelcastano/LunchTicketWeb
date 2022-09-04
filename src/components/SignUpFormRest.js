import React from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from "react";
import { BASEURL } from "../constants/Constants";

function SingupForm({ proRes }) {


  const[name, setName] = useState("");
  const[nit, setNit] = useState("");
  const[employeeName, setEmployeeName] = useState("");
  const[employeeId, setEmployeeId] = useState("");
  const[employeePassword, setEmployeePassword] = useState("");


  const handleClick = async () => {
  
    if(proRes){
      try {
        const response = await fetch(
          BASEURL+"/lunchticket/addRestaurant",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              nit: nit,
              pictureUrl: ""
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          //Aviso de que se creo
          console.log("agregado");
        }
      } catch (err) {
        console.log(err.message);
      }
    }else{
      console.log("Else")
      try {
        const response = await fetch(
          BASEURL+"/lunchticket/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              nit: nit,
              pictureUrl: "",
              persIddocument: employeeId,
              persName: employeeName,
              employeePassword: employeePassword
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          //Aviso de que se creo
          console.log("agregado");
        }
      } catch (err) {
        console.log(err.message);
      }
    }

  };

  const [payload, setPayload] = useState({});

  const onInput = (e) => {
    const value = e.target.value
    const name = e.target.name
    console.log(value);
    setPayload(
      ...payload,
      payload[name] = value
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box>
        <TextField
          id="outlined-basic"
          label="Nombre del restaurante"
          variant="outlined"
          size="small"
          name="name"
          onChange={(e)=>{
            setName(e.target.value)
          }}
        />
      </Box>
      <Box>
        <TextField
          id="outlined-basic"
          label="NIT del restaurante"
          variant="outlined"
          size="small"
          name="nit"
          onChange={(e)=>{
            setNit(e.target.value)
          }}
        />
      </Box>
      {!proRes && (
        <>
          <Box>
            <TextField
              id="outlined-basic"
              label="ID del empleado"
              variant="outlined"
              size="small"
              name="employeeId"
              onChange={(e)=>{
                setEmployeeId(e.target.value)
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
              onChange={(e)=>{
                setEmployeeName(e.target.value)
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
              onChange={(e)=>{
                setEmployeePassword(e.target.value)
              }}
            />
          </Box>
        </>
      )}
      <Stack
        direction="row"
        spacing={2}
        mt={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
       {/*<Button variant="contained" disableElevation onClick={()=>{
          proAdd(payload)
        }} endIcon={<HowToRegIcon />}>
          Registrar
      </Button>*/}
        <Button variant="contained" disableElevation onClick={handleClick} endIcon={<HowToRegIcon />}>
          Registrar
        </Button>
      </Stack>
    </Box>
  );
}

export default SingupForm;
