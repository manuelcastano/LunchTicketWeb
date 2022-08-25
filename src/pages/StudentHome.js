
import React from 'react';
import '../App.css';
import {Box, Tabs,Tab} from '@mui/material';
import "../App.css"
import { useState } from 'react';
import AddStudent from '../components/AddStudent';
import DeleteStudent from '../components/DeleteStudent';
import Sidebar from "../components/Sidebar";

const StudentHome =() => {
     const [value,setValue]= useState(0)
     const handleChange = (event, newValue) => {
        setValue(newValue);
};
    return (
    
        <div className='dflex3' >
      
        <box >
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs  value = {value} aria-label='Tabs example' onChange ={handleChange} centered>
                <Tab label = "Agregar Estudiante" />
                <Tab label = "Eliminar Estudiante"/>
            </Tabs>
        </Box>
      
        <TabPanel value={value} index={0}>
         <br/> 
         <div style={{justifyContent: 'center',alignItems: 'center', display: 'flex'}}>
            <AddStudent/>
        </div>
        </TabPanel>
        <Sidebar /> {/**AQUI TENEMOS EL PROBLEMA DE COMPONENTES */}

        <TabPanel value={value} index={1}>
        <br/> 
        <div style={{justifyContent: 'center',alignItems: 'center', display: 'flex'}}>
        <DeleteStudent/>
        </div>
        </TabPanel>
        
        </box>
      
    </div>

    );
}

function TabPanel(props)
{
const {children,value,index} = props;
    return(<div>
           {
            value===index && (
                    <h1>{children}</h1>
            )
           }
        </div>)
}
export default StudentHome;

