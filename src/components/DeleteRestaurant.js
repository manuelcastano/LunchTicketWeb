import * as React from "react";
import {Box, Typography} from "@mui/material";
import ResultInfoRestTable from "./ResultInfoRestTable";


export default function DeleteRestaurant() {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#999", my: 2 }}>
        Elimina un restaurante
      </Typography>
      <Box>
        <ResultInfoRestTable proRes={true} />
      </Box>
    </Box>
  );
}
