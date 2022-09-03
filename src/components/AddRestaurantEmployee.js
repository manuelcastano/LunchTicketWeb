import React from "react";
import { Box, Typography} from "@mui/material";
import SingupForm from "./SingupForm";

export default AddRestaurantEmployee;

function AddRestaurantEmployee() {

  return (
    <Box sx={{
      width: "100%",
      height: 500,
      backgroundColor: '#fff',
    }}>
      <Typography variant="h4" sx={{ color:'#999', my:2}}>
        Registra un empleado
      </Typography>
      <SingupForm proRes={false} />
    </Box>
  );
}
