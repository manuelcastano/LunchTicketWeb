import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { post} from '../actions/HttpUtil';
import AlertDialog from "./AlertDialog";

function CardViewScholarship(props) {
  const name =props.scholar.name;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const eliminar = async ()=>{
    const editScho = await post("/deleteScholarship", {
      name: name
    })
    if (!editScho.ok) {
      throw new Error(`Error! status: ${editScho.status}`);
    } else {
      const backResponse = await editScho.json();
      props.message(backResponse)
      props.onDelete();
    }
  }


  return (

    <Box
     
      sx={{
        display: "flex",
        flexWrap: "now-wrap",
        p: 1,
        m: 1,
        bgcolor: "#f4f4f4",
        maxWidth: 300,
        borderRadius: 1,
      }}
    >
      
      <Stack
        direction="row"
        spacing={1}
        mt={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          my: 2,
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
            {name}
          </Typography>
        </Box>
        <Box>
          <IconButton aria-label="delete" size="large"   onClick ={handleClickOpen}>
            <DeleteIcon/>
          </IconButton>
          {open&& <AlertDialog obj={name}  onDelete={eliminar}  setOpen={setOpen}   title="Eliminar beca" content="Deseas Eliminar la beca" /> }
        </Box>
      </Stack>

    </Box>
  );
}

export default CardViewScholarship;
