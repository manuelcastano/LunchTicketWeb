
import * as React from 'react';
import { useState, useEffect } from "react";
import { Box, Button, TextField, Stack,Typography } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { BASEURL } from '../constants/Constants';
import MenuItem from '@mui/material/MenuItem';
import CardViewStudent from './CardViewStudent';


export default function AddStudent() {

  const [codigo, setCodigo] = useState("");
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");

  const [currency, setCurrency] = React.useState("");
  const [scholarships, setScholarships] = useState([]);

  const [students, setStudents] = useState([]);
  const [status,setStatus]= useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  useEffect(() => {
    listScholarships()
    getStudents()
    console.log("oee " + scholarships.name)
  }, []);

  const listScholarships = async () => {
    const becas = await fetch(
      BASEURL + "/lunchticket/scholarships",
      {
        method: "GET"
      }
    ); if (!becas.ok) {
      throw new Error(`Error! status: ${becas.status}`);
    } else {
      const tiposbecas = await becas.json();
      setScholarships(tiposbecas);
    }
  }

  const getStudents = async () => {
    const liststudents = await fetch(
      BASEURL + "/lunchticket/students",
      {
        method: "GET"
      }
    ); if (!liststudents.ok) {
      throw new Error(`Error! status: ${liststudents.status}`);
    } else {
      const estudiantes = await liststudents.json();
      setStudents(estudiantes);
      console.log("back: ", estudiantes)
    }
  }

  const onAddStd = async () => {


    
    const createUser = await fetch(

      BASEURL + "/lunchticket/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persName: name,
          persLastname: lastname,
          persIddocument: document
        })
      }
    ); if (!createUser.ok) {
      throw new Error(`Error! status: ${createUser.status}`);

    } else {
      const student = await createUser.json();


    }

    const addRoll = await fetch(
      BASEURL + "/lunchticket/addRole",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document: document,
          userTypeId: 1
        }),
      }
    );
    if (!addRoll.ok) {
      throw new Error(`Error! status: ${addRoll.status}`);
    } else {
      //Recibir el usuario con un array que contenga sus roles
      //Cambiar la página con route de acuerdo al rol que tenga
      const backResponse = await addRoll.json();
      //setdelestado
      console.log("backResponse is: ", backResponse)

    }

    const addScholarShip = await fetch(
      BASEURL + "/lunchticket/addScholarship",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document: document,
          scholarshipName: currency
        }),
      }
    );
    if (!addScholarShip.ok) {
      throw new Error(`Error! status: ${addScholarShip.status}`);
    } else {
      //Recibir el usuario con un array que contenga sus roles
      //Cambiar la página con route de acuerdo al rol que tenga
      const backResponse = await addScholarShip.json();
      //setdelestado
      console.log("backResponse is: ", backResponse.username, " El estudiante se ha registrado exitosamente")
     
      setStatus(backResponse)

    }

    getStudents()

  };


  const renderList = () => {

    return (
      <div
        style={{
          height: 300,
          scrollbarWidth: "none",
          backgroundColor: "#ffff",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        }}
      >
        {students.map((option) => {
          return <CardViewStudent key={option.id} student={option} />;
        })}
      </div>
    );
  };



  return (
    <div>

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
            label="Codigo"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setCodigo(e.target.value)
            }}

          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Documento"
            variant="outlined"
            size="small"

            onChange={(e) => {
              setDocument(e.target.value)
            }}

          />
        </Box>

        <Box>

          <TextField
            id="outlined-basic"
            label="Nombres"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setName(e.target.value)
            }}

          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Apellidos"
            variant="outlined"
            size="small"

            onChange={(e) => {
              setLastName(e.target.value)
            }}

          />
        </Box>
        <Box>
          <TextField
            id="standard-select-currency"
            select
            label="Seleccione tipo de beca"
            value={currency}
            onChange={handleChange}
            helperText="Por favor seleccione el tipo de beca"
            variant="standard"
          >

            {scholarships.map((option) => (
              <MenuItem key={option.name} value={option.name}>
              {option.name}
              </MenuItem>
            ))}
          </TextField>

        </Box>

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

          <Button variant="contained" disableElevation onClick={onAddStd}  endIcon={<HowToRegIcon />}>
            Registrar
          </Button>


        </Stack>

        <Box>
          <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
            {}
          </Typography>
        </Box>

        <Box>

          {renderList()}

        </Box>

      </Box>
    </div>
  );
}