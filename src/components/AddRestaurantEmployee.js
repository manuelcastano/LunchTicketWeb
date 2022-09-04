import React from "react";
import { Box, Typography} from "@mui/material";
import SignUpFormRest from "./SignUpFormRest";

export default AddRestaurantEmployee;

function AddRestaurantEmployee() {

  return (
    <Box sx={{
      width: "100%",
      height: 500,
      backgroundColor: '#fff',
    }}>
      <Typography variant="h4" align="center" sx={{ color:'#999', my:2}}>
        Registra un empleado
      </Typography>
      <SignUpFormRest proRes={false} />
    </Box>
  );
}
