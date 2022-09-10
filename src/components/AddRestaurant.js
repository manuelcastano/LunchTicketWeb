import React from "react";
import { Box, Typography} from "@mui/material";
import SignUpFormRest from "./SignUpFormRest";

export default AddRestaurant;

function AddRestaurant() {

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ color:'#999', my:2}}>
        Registra un restaurante
      </Typography>
      <SignUpFormRest proRes={true}/>
    </Box>
  );
}
