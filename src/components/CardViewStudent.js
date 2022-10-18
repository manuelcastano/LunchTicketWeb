import { Box, Typography, Stack } from "@mui/material";
import React from "react";

function CardViewStudent(props) {
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
        
      </Stack>
    </Box>
  );
}

export default CardViewStudent;