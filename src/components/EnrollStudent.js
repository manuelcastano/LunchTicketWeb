import * as React from 'react';
import { useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';


export default function CheckboxLabels() {

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

    const [document, setDocument] = useState("");
    const [rows,setRows]= useState({});
    
    

    const onDocument = (event) => {
        setDocument(event.target.value);
      };
    
    
    const searchStudent = async () => {

        const resultSearch = await fetch(
            " https://cb52-186-27-157-17.ngrok.io/lunchticket/getUserByUsername",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: document
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
    return (
        <div>
        <TextField onChange={onDocument}  id="standard-basic" label="Documento" variant="standard" />
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
          value= {rows[0] && rows[0].pers_lastname}
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
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
    </Box>

          </div> 
    
     // para dar respuesta ok     
    );
  }