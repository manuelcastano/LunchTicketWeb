import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import { BASEURL } from "../constants/Constants";
import { useState } from "react";
import styles from "../css/CardView.module.css";

function CardViewEmployee(props) {
  const [deleted, setDeleted] = useState(false);

  console.log(props.employee.username);

  const Delete = async () => {
    let id = props.employee.username;
    let path = BASEURL + "/lunchticket/deleteRestaurantEmployee";
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
    <Box className={styles.box}>
      <Stack
        direction="row"
        spacing={2}
        mt={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
            {props.employee.pers_name}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ color: "#000000", my: 2 }}>
            {props.employee.username}
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
        {deleted && (
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#BA0606", my: 2 }}>
              {"(Eliminado)"}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default CardViewEmployee;