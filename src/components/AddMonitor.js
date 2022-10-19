
import * as React from 'react';
import { useState ,useEffect } from "react";
import { Box, Button, TextField, Stack, Typography} from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {post, get} from '../actions/HttpUtil';
import CardViewMAF from "../components/CardViewMAF"

export default function AddMonitor() {

  const [document, setDocument] = useState("");
  const [student, setStudent] = useState("");
  const [show, setShow] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [message, setMessage] = useState("");
  const [miembrosAF, setmiembrosAF] = useState([]);
  const [nameMF, setNameMF] = useState();
  const [apellidoMF, setApellidoMF] = useState();

  useEffect(() => {
    getmiembrosAF()
  }, []);

  
  const getmiembrosAF = async () => {
    const listMAF = await get("/membersAf")
     if (!listMAF.ok) {
      throw new Error(`Error! status: ${listMAF.status}`);
    } else {
      const mAF = await listMAF.json();
      setmiembrosAF(mAF);
    }
  }

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
        {miembrosAF.map((option) => {
          return <CardViewMAF key={option.id} student={option}  onDelete={()=>{getmiembrosAF()} } textresponse={setMessage}/>;
        })}
      </div>
    );
  };

  const AddRoleMonitor = async () => {
    setMessage("")
    const addRoleMAF = await post("/addRole", {
      document: document,
      userTypeId:3
    }); 
    if (!addRoleMAF.ok) {
      throw new Error(`Error! status: ${addRoleMAF.status}`);
    } else {
      const backResponse = await addRoleMAF.json();
      setMessage(backResponse.message)
      setShow(false)
      getmiembrosAF();
    }
   
  };

  const searchStudent = async () => {
    setMessage("");
    const resultSearch = await  post("/getUserByUsername", {
      id: document
    })
    if (!resultSearch.ok) {
      throw new Error(`Error! status: ${resultSearch.status}`);
    } else {
      try{
        const backResponse = await resultSearch.json();
        
        setStudent(backResponse);   
        setShow(true);
        setShowForms(false);
      } catch(err){
        setShow(false);
        setShowForms(true);
      }
      
    }
  }
  const login = async () => {
    const resultSearch = await  post("/login", {
      persName: nameMF,
      persLastname:apellidoMF,
      persIddocument: document
    })
    if (!resultSearch.ok) {
      throw new Error(`Error! status: ${resultSearch.status}`);
    } else {
        const addRoleMAF = await post("/addRole", {
          document: document,
          userTypeId:3
        });
        if (!addRoleMAF.ok) {
          throw new Error(`Error! status: ${addRoleMAF.status}`);
        } else {
          setShowForms(false)
          const backResponse = await addRoleMAF.json();
          setMessage(backResponse.message)
          getmiembrosAF()
         
        }      
    }
  
        
  }

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
        <Box>
        <Button variant="contained" disableElevation onClick={searchStudent} endIcon={<HowToRegIcon />}>
          Buscar Estudiante
        </Button>
        </Box>
       
      </Box>
      {show &&
        <div>
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
              value={student && student.pers_name}
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
              value={student && student.pers_lastname}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </Box>
        </Stack>
          <Button variant="contained" disableElevation onClick={AddRoleMonitor} endIcon={<HowToRegIcon />}>
            Agregar Monitor
          </Button>
        </div>}
      {showForms && 
        <div>
      
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              gap:"10px"
            }}
          >
           
           <Typography my={5} variant="subtitle1" color={"#BA0606"}>
            El estudiante no existe, por favor llenar formulario.
          </Typography>
           
            <Box>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setNameMF(e.target.value)
                }}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setApellidoMF(e.target.value)
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
          </Stack>
          <Button variant="contained" disableElevation onClick={login} endIcon={<HowToRegIcon />}>
            Agregar estudiante y monitor
          </Button>
        </div>}
      <Typography my={5} variant="subtitle1" color={"#BA0606"}>
        {message}
      </Typography>
      <box>
        {renderList()}
      </box>
    </div>
  );
}