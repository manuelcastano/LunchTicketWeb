import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import Report from "../components/Report"
import AddMonitor from "../components/AddMonitor"
import AddScholarship from "../components/AddScholarship"

const Management = () => {

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
                        <Tab label="Becas" />
                        <Tab label="Reportes" />
                        <Tab label="Monitores" />
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
                    <AddScholarship/>
                       
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
                        <Report/>
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
                        <AddMonitor/>
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
export default Management;
