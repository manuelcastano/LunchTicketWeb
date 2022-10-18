import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { post, get } from '../actions/HttpUtil';
import AlertDialog from "./AlertDialog";

function CardViewMAF(props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const eliminar = async ()=>{
    const deleteMonitor = await post("/deleteMemberAf", {
      id:props.student.userID.username
    })
    if (!deleteMonitor.ok) {
      throw new Error(`Error! status: ${deleteMonitor.status}`);
    } else {
      const backResponse = await deleteMonitor.json();
      setMessage(backResponse);
      props.onDelete();
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap-reverse",
        p: 1,
        m: 1,
        bgcolor: "#f4f4f4",
        maxWidth: 300,
        borderRadius: 1,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        mt={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          my: 2,
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
            {props.student.userID.pers_name}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
          {props.student.userID.pers_lastname}
          </Typography>
        </Box>

        <Box>
        <IconButton aria-label="delete" size="large"   onClick ={handleClickOpen}>
            <DeleteIcon/>
          </IconButton>
          {open&& <AlertDialog obj={props.student.userID.pers_name}  onDelete={eliminar}  setOpen={setOpen}   title="Eliminar Monitor" content="Deseas eliminar el monitor" /> }
        </Box>
        
      </Stack>
    </Box>
  );
}

export default CardViewMAF;