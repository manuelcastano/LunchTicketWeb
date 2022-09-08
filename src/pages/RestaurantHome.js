import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import AddRestaurant from "../components/AddRestaurant";
import DeleteRestaurant from "../components/DeleteRestaurant";
import AddRestaurantEmployee from "../components/AddRestaurantEmployee";
import DeleteRestaurantEmployee from "../components/DeleteRestaurantEmployee";
import ResultInfoRestTable from "../components/ResultInfoRestTable";

const RestaurantHome = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="dflex3">
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <AddRestaurant />
          <ResultInfoRestTable proRes={true} />
        </Box>
      </Box>
    </div>
  );
};
function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
}
export default RestaurantHome;
