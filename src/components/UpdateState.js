
import * as React from 'react';
import { useState } from "react";
import { Box, Button, TextField, Stack, Typography} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuItem from '@mui/material/MenuItem';
import styles from '../css/AddStudent.module.css'; 
import {post, get} from '../actions/HttpUtil';

export default function AddStudent() {

  const [document, setDocument] = useState("");
  const [student, setStudent] = useState("");
  const [beca, setBeca] = useState(null);
  const [show, setShow] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [currency, setCurrency] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const onDesactiveState = async () => {
    const desactiveState = await post("/deactivateScholarship", {
      id: document
    });
    if (!desactiveState.ok) {
      throw new Error(`Error! status: ${desactiveState.status}`);
    } else {
      const backResponse = await desactiveState.json();     
    }
  };

  const onActiveState = async () => {
    const addScholarShip = await post("/addScholarship",{
      document: document,
      scholarshipName: currency
    })
    if (!addScholarShip.ok) {
      throw new Error(`Error! status: ${addScholarShip.status}`);
    } else {
      const backResponse = await addScholarShip.json();
      setMessage(backResponse.message)
    }
  }

  const searchStudent = async () => {
    const resultSearch = await  post("/getStudent", {
      id: document
    })
    if (!resultSearch.ok) {
      throw new Error(`Error! status: ${resultSearch.status}`);
    } else {
      const backResponse = await resultSearch.json();
      setStudent(backResponse)
      if (backResponse.active === 'N') {
        setBeca(true);
      } else if (backResponse.active === 'Y') {
        setBeca(false);
      }
      setShow(true);
    }
  }
  React.useEffect(() => {
    listScholarships()
  }, []);

  const listScholarships = async () => {
    const becas = await get("/scholarships")
    if (!becas.ok) {
      throw new Error(`Error! status: ${becas.status}`);
    } else {
      const tiposbecas = await becas.json();
      setScholarships(tiposbecas);
    }
  }

  const activeSchollarShip = () => {
    return (
      <div className={styles.list} >
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
        <Button variant="contained" disableElevation onClick={onActiveState} endIcon={<HowToRegIcon />}>
          Activar Beca
        </Button>
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
            label="Documento"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setDocument(e.target.value)
            }}
          />
        </Box>
        <Button variant="contained" disableElevation onClick={searchStudent} endIcon={<HowToRegIcon />}>
          Buscar
        </Button>
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
          <Box>
            <TextField
              id="standard-read-only-input"
              label="Nombres"
              defaultValue="   "
              value={student && student.userID.pers_name}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Box>
          <Box>
            <TextField
              id="standard-read-only-input"
              label="Apellidos"
              defaultValue="  "
              value={student && student.userID.pers_lastname}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Box>
        </Stack>
      </Box>
      {show && (
        <div>
          {beca ?
            activeSchollarShip()
            : <Button variant="contained" disableElevation onClick={onDesactiveState} endIcon={<HowToRegIcon />}>
              Desctivar Beca
            </Button>}
        </div>
      )}
      <br></br>
      <Typography my={5} variant="subtitle1" color={"#BA0606"}>
        {message}
      </Typography>
    </div>
  );
}