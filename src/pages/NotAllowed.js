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
      minHeight="100vh"
      flexDirection={"column"}
    >
      <Box>
        <Typography variant="h2">Acceso denegado</Typography>
      </Box>
      <Box my={10}>
        <Typography variant="h4">No tienes acceso a esta página</Typography>
        <Typography variant="h4">
          Comunícate con la Oficina de Apoyo Financiero para más información
        </Typography>
      </Box>
      <Box>
        <Button onClick={onClick}>Cerrar Sesión</Button>
      </Box>
    </Box>
  );
};
export default NotAllowed;
