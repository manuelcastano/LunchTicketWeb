import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";
import { BASEURL } from "../constants/Constants";
import { useState } from "react";
import styles from "../css/CardView.module.css";
import EmployeesHome from "./EmployeesHome";
import { useNavigate } from "react-router-dom";

function CardView(props) {
  const [deleted, setDeleted] = useState(false);
  const [nit, setNit] = useState(props.resturant.nit);
  const [name, setName] = useState(props.resturant.name);

  const navigate = useNavigate();

  const Delete = async () => {
    let path = BASEURL + "/lunchticket/deleteRestaurant";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nit,
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

  const employees = () => {
    navigate("/employees", {
      state: {
        nit: nit,
      },
    });
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
          <Button onClick={employees} sx={{ color: "#000000", my: 2 }}>
            {name}
          </Button>
        </Box>

        <Box>
          <Button disabled={true} sx={{ color: "#000000", my: 2 }}>
            {nit}
          </Button>
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

export default CardView;
