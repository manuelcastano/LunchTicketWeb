
import React from 'react';
import '../App.css';
import {Box, Tabs,Tab} from '@mui/material';
import "../App.css"


import { useState } from 'react';



const Home =() => {
     const [value,setValue]= useState(0)
     const handleChange = (event, newValue) => {
        setValue(newValue);
};
    return (
    
        <div className='dflex3' >
      
        <box >
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs  value = {value} aria-label='Tabs example' onChange ={handleChange}>
                <Tab label = "Agregar Estudiante" />
                <Tab label = "Eliminar Estudiante"/>
            </Tabs>
        </Box>
    
        <TabPanel value={value} index={0}>Add Stuhu</TabPanel>
        
        <TabPanel value={value} index={1}>Delete Student</TabPanel>
        
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


export default Home;

