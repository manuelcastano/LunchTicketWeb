import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import {Typography} from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { BASEURL } from "../constants/Constants";

export default function EnrollStudent() {

  const [currency, setCurrency] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [message, setMessage] = useState("");
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
      BASEURL + "/scholarships",
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


  const searchStudent = async () => {
    
    const resultSearch = await fetch(
      BASEURL + "/getUserByUsername",
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
      try{
      const backResponse = await resultSearch.json();
      setMessage("")
      setRows([backResponse]);
      }catch(err){
      setMessage("Por favor ingresa un documento valido")
      }
    }

  }

  const enRoll = async () => {

    const addRoll = await fetch(
      BASEURL + "/addRole",
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
      const backResponse = await addRoll.json();
    }

    const addScholarShip = await fetch(
      BASEURL + "/addScholarship",
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
      const backResponse = await addScholarShip.json();
      setMessage(backResponse.message)
      setDocument("")
      setCurrency("")

    }

  }

  return (
    <div>
      <TextField onChange={onDocument} id="standard-basic" label="Documento" variant="standard"  value ={document}/>
      <Button size="small" onClick={searchStudent}>Buscar Estudiante</Button>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },

         display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
      }}
      noValidate
      autoComplete="off"

      
    >
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
          <br></br>
          <Typography my={5} variant="subtitle1" color={"#BA0606"}>
            {message}
          </Typography>
      </Box>
    </div>
  );
}