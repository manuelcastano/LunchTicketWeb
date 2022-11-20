import React from "react";
import MySideBar from "../components/MySideBar";
import StudentHome from "./StudentHome";
import styles from '../css/DashBoard.module.css'; // Import css modules stylesheet as styles
import RestaurantHome from "./RestaurantHome";
import { Box} from "@mui/material";
import Management from "../components/Management";
import { useNavigate } from "react-router-dom";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  content() {
    // if (this.state.page === 0) {
    //   console.log("Cerrando sesion");
    // } else
    if (this.state.page === 1) {
      return <StudentHome />;
    }else if (this.state.page === 2) {
      return <RestaurantHome />;
    }else if (this.state.page === 3) {
      return <Management />;
    }
    
  }

  // componentDidMount() {
  //   const navigate = useNavigate();
  //   let account = JSON.parse(localStorage.getItem("account"));
  //   if (account != null) {
  //     //console.log(account.user.persName);
  //     const rolesAllowed = account.roles.find(
  //       (roles) => roles.id === 3 || roles.id === 4
  //     );
  //     if (rolesAllowed != null) {
  //       //console.log("dentro de allowed");
  //       navigate("/dashboard");
  //     } else {
  //       navigate("/notAllowed");;
  //     }
  //     return;
  //   }
  // }

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
