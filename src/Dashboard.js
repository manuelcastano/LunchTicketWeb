import React from "react";
import MySideBar from "../src/components/MySideBar";
import StudentHome from "./pages/StudentHome";
import styles from './css/DashBoard.module.css'; // Import css modules stylesheet as styles

import RestaurantHome from "./pages/RestaurantHome";
import AddRestaurantEmployee from "./components/AddRestaurantEmployee";
import { Box} from "@mui/material";
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  content() {
    if (this.state.page === 0) {
      console.log("Cerrando sesion");
      window.location.href = "/";
    } else if (this.state.page === 1) {
      return <StudentHome />;
    }else if (this.state.page === 2) {
      return <RestaurantHome />;
    }else if (this.state.page === 4) {
      return <AddRestaurantEmployee />;
    }
    
  }

  componentDidMount() {
    // let account = JSON.parse(localStorage.getItem("account"));
    // if (account != null) {
    //   //console.log(account.user.persName);
    //   const rolesAllowed = account.roles.find(
    //     (roles) => roles.id === 3 || roles.id === 4
    //   );
    //   if (rolesAllowed != null) {
    //   } else {
    //     window.location.href = "/";
    //   }
    // }
    // else{
    //   window.location.href = "/";
    // }
  }

  render() {
    return (
   
      <Box className={styles.body}>
        <MySideBar
          onOption={(option) => {
            this.setState({ page: option });
          }}
        />
        <div className={styles.content}>{this.content()}</div>
      </Box>

    );
  }
}
