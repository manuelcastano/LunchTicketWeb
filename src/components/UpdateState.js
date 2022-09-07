
import * as React from 'react';
import { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { BASEURL } from '../constants/Constants';


export default function AddStudent() {


  const [document, setDocument] = useState("");

  const onUpdateState = async () => {

    const changeState = await fetch(
      BASEURL + "/lunchticket/deactivateScholarship",
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
    if (!changeState.ok) {
      throw new Error(`Error! status: ${changeState.status}`);
    } else {
      //Recibir el usuario con un array que contenga sus roles
      //Cambiar la página con route de acuerdo al rol que tenga
      const backResponse = await changeState.json();
      //setdelestado
      console.log("backResponse is: ", backResponse)


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
            label="Documento"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setDocument(e.target.value)
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

          <Button variant="contained" disableElevation onClick={onUpdateState} endIcon={<HowToRegIcon />}>
            Cambiar Estado
          </Button>
        </Stack>

      </Box>
    </div>
  );
}