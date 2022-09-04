import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import AddRestaurant from "../components/AddRestaurant";
import DeleteRestaurant from "../components/DeleteRestaurant";
import AddRestaurantEmployee from "../components/AddRestaurantEmployee";
import DeleteRestaurantEmployee from "../components/DeleteRestaurantEmployee";

const RestaurantHome = () => {
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
            <Tab label="Agregar Restaurante" />
            <Tab label="Eliminar Restaurante" />
            <Tab label="Agregar Empleado" />
            <Tab label="Eliminar Empleado" />
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
            <AddRestaurant />
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
            <DeleteRestaurant />
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
            <AddRestaurantEmployee />
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
            <DeleteRestaurantEmployee />
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
export default RestaurantHome;
