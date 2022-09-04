


import * as React from 'react';
import { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';



export default function AddStudent() {

  const[codigo, setCodigo] = useState("");
  const[document, setDocument] = useState("");
  const[name, setName] = useState("");
  const[lastname, setLastName] = useState("");

  const handleClick = async () => {

    
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
      
        <Button variant="contained" disableElevation onClick={handleClick} endIcon={<HowToRegIcon />}>
          Registrar
        </Button>
      </Stack>
      
    </Box>
    </div>
  );
}