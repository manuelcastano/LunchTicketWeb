import * as React from 'react';
import { useState } from "react";
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { BASEURL } from '../constants/Constants';
import fileDownload from 'js-file-download'
import { Button,Stack} from "@mui/material";
import Date from './Date';

export default function Report() {

    const [rows,setRows]= useState([]);
    const [dateini,setDateini]= useState(dayjs());
    const [dateFin,setDateFin]= useState(dayjs());
    const [download,setDownload]= useState(false);
    const [report,setReport]= useState([]);

    const columns = [

        { field: 'documento', headerName: 'Documento', width: 180 },
        { field: 'apellido', headerName: 'Apellidos', width: 180 },
        { field: 'nombre', headerName: 'Nombres', width: 180 },
        { field: 'cafeteria', headerName: 'Cafeteria', width: 180 },
        { field: 'fecha', headerName: 'Fecha', width: 180 },
        { field: 'lunchstate', headerName: 'Estado', width: 180 },
      ];
   
    const genereteReport = async () => {
        
        const resultSearch = await fetch(
            BASEURL+"/getReportArray",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                startDate: dateini.valueOf(),
                finalDate: dateFin.valueOf()+86400000
              }),
            }
          );
          if (!resultSearch.ok) {
            throw new Error(`Error! status: ${resultSearch.status}`);
          } else {
            const backResponse = await resultSearch.json();
            console.log("backResponse is: ", backResponse);
            setReport(backResponse);
            const dataRow = backResponse && backResponse.map((lunch) => {
              return {
                  id:lunch.id,
                  documento:lunch.studentID.userID.username,
                  nombre:lunch.studentID.userID.pers_name,
                  apellido:lunch.studentID.userID.pers_lastname,
                  fecha:dayjs(lunch.dateLunch).format("DD/MMMM/YYYY"),
                  lunchstate:lunch.accepted==='Y'? "Aceptado": 'Rechazado',
                  cafeteria:lunch.restaurantID.name     
              }
          });
          setRows(dataRow);
          setDownload(true);
          }
    }

    const downloadReport= () => {
      let header = "NOMBRE;APELLIDO;NUMERO DE IDENTIFICACION;CAFETERIA;FECHA DE ALMUERZO; ALMUERZO ACEPTADO;\n";
      console.log(report)
      report.forEach((lunch)=>{
        header +=lunch.studentID.userID.pers_name+";";
        header +=lunch.studentID.userID.pers_lastname+";";
        header +=lunch.studentID.userID.username+";";
        header +=lunch.restaurantID.name+";";
        header +=dayjs(lunch.dateLunch).format("DD/MMMM/YYYY")+";";
        header +=lunch.accepted+";\n";
      })
        fileDownload(header,"report.csv")
    }

    return (
      <div>
        <Stack
          direction="row"
          spacing={4}
          mt={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Date value={dateini} date={setDateini} title="Desde" />
          <Date value={dateFin} date={setDateFin} title="Hasta" />
          <Button variant="contained" disableElevation onClick={genereteReport}>
            Mostrar reporte
          </Button>
          {download && <Button variant="contained" disableElevation onClick={downloadReport}>
            Descargar reporte
          </Button>}
        </Stack>
        <br></br>

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[2]}
            getRowId={(row) => row.id + row.nombre}
          />
        </div>

      </div>
    );
  }