import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import { BASEURL } from "../constants/Constants";
import { useState } from "react";

function CardView(props) {
  const [deleted, setDeleted] = useState(false);

  const Delete = async () => {
    let id = "";
    let path = BASEURL + "/lunchticket";
    if (props.proRes) {
      id = props.resturant.nit;
      path = path + "/deleteRestaurant";
    } else {
      id = props.employee.username;
      path = path + "/deleteRestaurantEmployee";
    }
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        setDeleted(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
      {props.proRes ? (
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
              {props.resturant.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
              {props.resturant.nit}
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={() => {
                Delete();
              }}
            >
              Eliminar
            </Button>
          </Box>
        </Stack>
      ) : (
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
              {props.employee.pers_name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
              {props.employee.usernmae}
            </Typography>
          </Box>

          <Box>
            <Button
              onClick={() => {
                Delete();
              }}
            >
              Eliminar
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default CardView;
