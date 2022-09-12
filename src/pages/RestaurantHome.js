import React from "react";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useState, useEffect } from "react";
import { BASEURL } from "../constants/Constants";
import styles from "../css/RestaurantHome.module.css";
import CardView from "../components/CardViewRestaurant.js";
import listStyles from "../css/List.module.css";
import EmployeesHome from "../components/EmployeesHome";

const RestaurantHome = () => {
  const [name, setName] = useState("");
  const [nit, setId] = useState("");

  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);

  const [all, setAll] = useState([]);

  const getAll = async () => {
    try {
      const response = await fetch(BASEURL + "/lunchticket/restaurants", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      } else {
        const backResponse = await response.json();
        setAll(backResponse);
      }
    } catch (err) {
      console.log(err.message);
      setName("No se encuentra");
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const renderList = () => {
    return (
      <Box className={listStyles.box}>
        {all.map((option) => {
          console.log(option.nit);
          return <CardView key={option.id} resturant={option}>
          </CardView>;
        })}
      </Box>
    );
  };

  const handleClick = async () => {
    setAdded(false);
    setMessage("");

    if (!(name === "" || nit === "")) {
      try {
        const response = await fetch(BASEURL + "/lunchticket/addRestaurant", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            nit: nit,
            pictureUrl: "",
          }),
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          const backResponse = await response.json();
          if (backResponse) {
            //Aviso de que se creo
            setAdded(true);
            setMessage("Agregado éxitosamente");
            getAll();
          } else {
            console.log(backResponse);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setMessage("Por favor llena todos los campos");
    }
  };

  return (
    <Box className={styles.bigBox}>
      <Box className={styles.smallBox}>
        <Typography variant="h4" align="center" sx={{ color: "#999", my: 2 }}>
          Registra un restaurante
        </Typography>
        <Box>
          <TextField
            label="Nombre del restaurante"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Box>
        <Box>
          <TextField
            label="NIT del restaurante"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Box>
        <Button
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<HowToRegIcon />}
        >
          Registrar
        </Button>
        <Box>
          <Typography my={5} variant="subtitle1" color={"#BA0606"}>
            {message}
          </Typography>
        </Box>
      </Box>
      <Box>
      <Typography my={5} variant="h5" color={"#999"}>
        Restaurantes
      </Typography>
      <Box>
      {renderList(true)}
      </Box>
      </Box>
    </Box>
  );
};

export default RestaurantHome;
