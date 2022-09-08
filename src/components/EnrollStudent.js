import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { BASEURL } from "../constants/Constants";

export default function EnrollStudent() {

  const [currency, setCurrency] = React.useState("");
  const [scholarships, setScholarships] = useState([]);
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [document, setDocument] = useState("");
  const [rows, setRows] = useState({});

  const onDocument = (event) => {
    setDocument(event.target.value);
  };

  React.useEffect(() => {
    listScholarships()
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
      console.log("backResponse is tipos de bacas: ", tiposbecas)

    }
  }


  const searchStudent = async () => {

    const resultSearch = await fetch(
      BASEURL + "/lunchticket/getUserByUsername",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: document
        }),
      }
    );
    if (!resultSearch.ok) {
      throw new Error(`Error! status: ${resultSearch.status}`);
    } else {
      //Recibir el usuario con un array que contenga sus roles
      //Cambiar la página con route de acuerdo al rol que tenga
      const backResponse = await resultSearch.json();
      setRows([backResponse]);
      console.log("backResponse is: ", backResponse.username)


    }

  }

  const enRoll = async () => {

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
      console.log("backResponse is: ", backResponse.username)


    }

  }

  return (
    <div>
      <TextField onChange={onDocument} id="standard-basic" label="Documento" variant="standard" />
      <Button size="small" onClick={searchStudent}>Buscar Estudiante</Button>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          
          <TextField
            id="standard-read-only-input"
            label="Nombres"
            defaultValue="   "
            value={rows[0] && rows[0].pers_name}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          
          <TextField
            id="standard-read-only-input"
            label="Apellidos"
            defaultValue="  "
            value={rows[0] && rows[0].pers_lastname}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />

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
          <br></br>
          <Button variant="contained" disableElevation onClick={enRoll} endIcon={<HowToRegIcon />}>
            Registrar
          </Button>
        </div>
      </Box>
    </div>
  );
}