import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import AddStudent from "../components/AddStudent";
import UpdateState from "../components/UpdateState";
import EnrollStudent from "../components/EnrollStudent";
import Tabla from "../components/Tabla"

const StudentHome = () => {
  /*let account = JSON.parse(localStorage.getItem("account"));

  if (account != null) {
    //console.log(account.user.persName);
    const rolesAllowed = account.roles.find(
      (roles) => roles.id === 3 || roles.id === 4
    );
    if (rolesAllowed != null) {
      //console.log("dentro de allowed");
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/notAllowed";
    }
    return;
  }*/
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="dflex3">
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            aria-label="Tabs example"
            onChange={handleChange}
            centered
          >
            <Tab label="Agregar Estudiante" />
            <Tab label="Cambiar Estado del Estudiante" />
            <Tab label="Enrolar Estudiante" />
            <Tab label="Ejemplo Tabla" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <br />
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <AddStudent />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <br />
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <UpdateState />
          </div>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <br />
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >    
             <EnrollStudent />
          </div>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <br />
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
           <Tabla />
            
          </div>
        </TabPanel>


      </Box>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
}
export default StudentHome;
