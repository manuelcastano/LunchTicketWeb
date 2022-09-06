
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