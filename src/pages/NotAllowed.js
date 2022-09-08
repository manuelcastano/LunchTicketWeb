import { Box, Typography, Button } from "@mui/material";
import React from "react";

const NotAllowed = () => {
  const onClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      <Box>
        <Typography variant="h1" color={"#BA0606"}>
          Acceso denegado
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={"column"}
      >
        <Typography variant="h2">No tienes acceso a esta página</Typography>
        <Typography variant="h4">
          Comunícate con la Oficina de Apoyo Financiero para más información
        </Typography>
      </Box>
      <Box my={10}>
        <Button onClick={onClick}>Cerrar Sesión</Button>
      </Box>
    </Box>
  );
};
export default NotAllowed;
