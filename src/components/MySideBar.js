import { style } from '@mui/system';
import React from 'react';
import logo from "../imgs/logo.png";
import styles from '../css/MySideBar.module.css'; 
import { useNavigate } from "react-router-dom";

const MySideBar = (props) => {

  const navigate = useNavigate();

  const onClick = () => {
    goHome;
    localStorage.clear();
  };

  const goHome = () => {
    navigate("/");
  };
    return (
      
      <div className={styles.container}>


          <img className={style.logo} src={logo}/>
        
            <button className={styles.button} onClick={()=>{props.onOption(1)}}>
                Estudiante
            </button>

            <button className={styles.button} onClick={()=>{props.onOption(2)}}>
                Restaurante
            </button>
            <button className={styles.button} onClick={()=>{props.onOption(3)}}>
                Administracion
            </button>
            <button className={styles.button} onClick={()=>{onClick()}}>
                Cerrar Sesión
            </button>


      </div>
    
    );
  };
  
  export default MySideBar;