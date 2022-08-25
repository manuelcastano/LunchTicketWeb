import React from 'react';
import { Outlet } from 'react-router-dom';

const MySideBar = (props) => {
    return (
      <>
      <div style={{ display: 'flex', flexDirection:'column', height: '100vh', width:'300px', overflow: 'scroll initial', backgroundColor:'#000' }}>
        
            <button onClick={()=>{props.onOption(1)}}>
                Estudiante
            </button>

            <button onClick={()=>{props.onOption(2)}}>
                Restaurante
            </button>

            {/*<button onClick={()=>{
              props.onOption(0)
              localStorage.clear()}}>
                Cerrar Sesión
            </button>*/}


      </div>
      <Outlet />
      </>
    );
  };
  
  export default MySideBar;