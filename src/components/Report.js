import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { BASEURL } from '../constants/Constants';
import Date from './Date';



export default function Report() {

    const [document, setDocument] = useState("");
    const [rows,setRows]= useState({});
    const [dateini,setDateini]= useState("");
    const [dateFin,setDateFin]= useState("");
    
    const columns = [
        { field: 'username', headerName: 'Documento', width: 180 },
        { field: 'pers_name', headerName: 'Nombres', width: 180 },
        { field: 'pers_lastname', headerName: 'Apellidos', width: 180 },
        
        {
          field: 'typescholarship',
          headerName: 'Seleccione el tipo de beca',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.nombres || ''} ${params.row.apellidos || ''}`,
        },
      ];
      
    

    const onDocument = (event) => {
        setDocument(event.target.value);
      };
    
    
    const searchStudent = async () => {

        const resultSearch = await fetch(
            BASEURL+"/getUserByUsername",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: document
              }),
            }
          );
          if (!resultSearch.ok) {
            throw new Error(`Error! status: ${resultSearch.status}`);
          } else {
            //Recibir el usuario con un array que contenga sus roles
            //Cambiar la página con route de acuerdo al rol que tenga
            const backResponse = await resultSearch.json();
            setRows([backResponse]);
          
            console.log("backResponse is: ", backResponse.username);
            
             
    
          }

    }
    return (
        <div>
        <Date setStartDate={setDateini} title="Desde"/>
        <br></br>
        <Date setStartDate={setDateFin} title="Hasta"/>
        <br></br>
        <div style={{ height: 200, width: '120%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[1]}
        checkboxSelection
      
      />
    </div> 
        </div>
     // para dar respuesta ok     
    );
  }