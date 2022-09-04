import * as React from "react";
import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import {
  CardActions,
  Button,
  Box,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";
import { BASEURL } from "../constants/Constants";

export default function ResultInfoRestTable({ proRes }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [rows, setRows] = useState([]);

  const handleClick = async () => {
    if (proRes) {
      try {
        const response = await fetch(BASEURL + "/lunchticket/addRestaurant", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            nit: id,
            pictureUrl: "",
          }),
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          //Aviso de que se creo
          console.log("agregado");
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("Else");
      try {
        console.log("id: " + id);
        const response = await fetch(
          BASEURL + "/lunchticket/getUserByUsername",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        } else {
          //Aviso de que se creo
          const backResponse = await response.json();
          let json = JSON.stringify(backResponse);
          console.log("response: " + json);
          setRows([backResponse]);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <Box>
      <Box>
        <TextField
          id="standard-basic"
          label="Nit del restaurante"
          variant="standard"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Button size="small" onClick={handleClick}>
          Buscar
        </Button>
      </Box>

      <Box paddingTop={5}>
        <TextField
          id="standard-read-only-input"
          label="Nombre"
          defaultValue="   "
          value={rows[0] && rows[0].pers_name}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Id"
          defaultValue="   "
          value={rows[0] && rows[0].username}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
      </Box>
    </Box>
  );
}
