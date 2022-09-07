
import * as React from 'react';
import { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { BASEURL } from '../constants/Constants';
import MenuItem from '@mui/material/MenuItem';


export default function AddStudent() {

  const[codigo, setCodigo] = useState("");
  const[document, setDocument] = useState("");
  const[name, setName] = useState("");
  const[lastname, setLastName] = useState("");

  const [currency, setCurrency] = React.useState("");
  const [scholarships, setScholarships] = React.useState([]);


  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  React.useEffect(()=>{
    listScholarships()
    console.log("oee " +scholarships.name)
  },[]);

  const listScholarships = async () => { 
  const becas = await fetch(
    BASEURL+"/lunchticket/scholarships",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }
  ); if (!becas.ok) {
    throw new Error(`Error! status: ${becas.status}`);
  } else {
    const tiposbecas = await becas.json();
    setScholarships(tiposbecas);
}
}

const onAddStd = async () => {


  const createUser = await fetch(

    BASEURL+"/lunchticket/login",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        persName:name,
        persLastname:lastname,
        persIddocument:document
      })
    }
  ); if (!createUser.ok) {
    throw new Error(`Error! status: ${createUser.status}`);
  } else {
    const student = await createUser.json();

}

const addRoll = await fetch(
  BASEURL+"/lunchticket/addRole",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      document:document,
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
  BASEURL+"/lunchticket/addScholarship",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      document:document,
      scholarshipName:currency
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
 

}
    
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
          onChange={(e)=>{
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
          
          onChange={(e)=>{
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
          onChange={(e)=>{
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
          
          onChange={(e)=>{
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
      
        <Button variant="contained" disableElevation onClick={onAddStd} endIcon={<HowToRegIcon />}>
          Registrar
        </Button>
      </Stack>
      
    </Box>
    </div>
  );
}