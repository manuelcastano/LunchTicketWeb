import * as React from "react";
import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { CardActions, Button, Box, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper} from "@mui/material";
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
        console.log("id: "+ id);
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
          console.log("response: "+json);
          setRows();
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ minWidth: 275 }}>
        <React.Fragment>
          <CardContent>
            <TextField
              id="standard-basic"
              label="Nit del restaurante"
              variant="standard"
              onChange={(e)=>{
                setId(e.target.value);
              }}
            />
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleClick}>
              Buscar
            </Button>
          </CardActions>
        </React.Fragment>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Nit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
