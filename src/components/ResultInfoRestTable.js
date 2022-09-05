import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, Typography } from "@mui/material";
import { BASEURL } from "../constants/Constants";

export default function ResultInfoRestTable({ proRes }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [found, setFound] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleClick = async () => {
    setDeleted(false);
    setFound(false);
    if (proRes) {
      try {
        const response = await fetch(
          BASEURL + "/lunchticket/getRestaurantByNit",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          const backResponse = await response.json();
          setFound(true);
          setName(backResponse.name);
          setId(backResponse.nit);
        }
      } catch (err) {
        console.log(err.message);
        setName("No se encuentra");
      }
    } else {
      try {
        const response = await fetch(
          BASEURL + "/lunchticket/getUserByUsername",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          const backResponse = await response.json();
          setFound(true);
          setName(backResponse.pers_name);
          setId(backResponse.username);
        }
      } catch (err) {
        console.log(err.message);
        setName("No se encuentra");
      }
    }
  };

  const Delete = async () => {
    let path = BASEURL + "/lunchticket";
    if (proRes) {
      path = path + "/deleteRestaurant";
    } else {
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
        setName("");
        setId("");
        setDeleted(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box>
      <Box>
        {proRes ? (
          <TextField
            id="standard-basic"
            label="Nit del restaurante"
            variant="standard"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        ) : (
          <TextField
            id="standard-basic"
            label="Id del empleado"
            variant="standard"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        )}

        <Button size="small" onClick={handleClick}>
          Buscar
        </Button>
      </Box>
      <Box paddingTop={5}>
        <TextField
          id="standard-read-only-input"
          label="Nombre"
          value={name}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Id"
          value={id}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
      </Box>
      <Box>
        {found && !deleted && <Button onClick={Delete}>Eliminar</Button>}
      </Box>
      <Box>
        {deleted &&
        <Typography my={5} variant="subtitle1" color={"#BA0606"}>
          Eliminado éxitosamente
        </Typography>
        }
      </Box>
    </Box>
  );
}
