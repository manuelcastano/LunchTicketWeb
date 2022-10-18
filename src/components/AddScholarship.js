
import * as React from 'react';
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { post, get } from '../actions/HttpUtil';
import CardViewScholarship from './CardViewScholarship'

export default function AddScholarship() {

    const [scholarship, setScholarship] = useState("");
    const [message, setMessage] = useState();
    const [result, setResult] = useState("");
    const [listScho,setListScho] =useState([]);

    const addScholarship = async () => {
        const addScho = await post("/addNewScholarship", {
            name: scholarship
        });
        if (!addScho.ok) {
            throw new Error(`Error! status: ${addScho.status}`);
        } else {
            const backResponse = await addScho.json();
            setResult(backResponse.message)
            
        }
        listScholarship();
    };

    useEffect(() => {
        listScholarship()
      }, []);

    const listScholarship = async () => {
        const list = await get("/scholarships");
        if (!list.ok) {
            throw new Error(`Error! status: ${list.status}`);
        } else {
            const backResponse = await list.json();
            setListScho(backResponse);
        }
    };

    const renderList = () => {

        return (
          <div
               style={{
                height: 520,
                scrollbarWidth: "none",
                backgroundColor: "#ffff",
                display: "flex",
                flexDirection: "column",
                overflowY: "scroll",
        }}
          >
            {listScho.map((option) => {
              return <CardViewScholarship key={option.id} scholar={option}  
               onDelete={()=>{
                listScholarship();
               }} message={setMessage}
              />;
            })}
          </div>
        );
      };


    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <Box>
                    <TextField
                        id="outlined-basic"
                        label="Nombre de la beca"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                            setScholarship(e.target.value)
                        }}
                    />
                </Box>
                <Button variant="contained" disableElevation onClick={addScholarship} endIcon={<HowToRegIcon />}>
                    Agregar Nueva beca
                </Button>
            </Box>
           
            <Typography my={5} variant="subtitle1" color={"#BA0606"}>
                {result}
            </Typography>
            
            <Box>
                {renderList()}
            </Box>
        </div>
    );
}