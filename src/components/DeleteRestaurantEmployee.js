import * as React from "react";
import Box from "@mui/material/Box";
import ResultInfoRestTable from "./ResultInfoRestTable";
import { Typography } from "@mui/material";

export default function DeleteRestaurantEmployee() {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#999", my: 2 }}>
        Elimina un empleado
      </Typography>
      <Box>
        <ResultInfoRestTable proRes={false} />
      </Box>
    </Box>
  );
}
