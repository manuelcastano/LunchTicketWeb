import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MySideBar from "../src/components/MySideBar";
import StudentHome from "./pages/StudentHome";
import "./App.css";
import { Routes } from "react-router-dom";
import RestaurantHome from "./pages/RestaurantHome";
import { useState } from "react";
import "./model/Util";
import {example, alfa} from "./model/Util";
export default class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page: 0
    };
  }

  content(){
    if(this.state.page == 0){
      return (<StudentHome/>);

    }else if(this.state.page == 1){
      return (<RestaurantHome/>);
    }
  }

  componentDidMount(){
    let account = JSON.parse(localStorage.getItem('account'));
    //console.log(account.user.persName);
    const rolesAllowed = account.roles.find(
      (roles) => roles.id === 3 || roles.id === 4
    );
    if (rolesAllowed!=null) {
      console.log("Permitidooooo");
      
    } else {
      console.log("Denegadooo");
    }
  }


  render() {

  

    return (
      
        <div className="dflex">
          <MySideBar onOption={(option)=>{
            this.setState({page: option});
          }}/> 
          <div className="dflex2">     
            
            {this.content()}
              
          </div>
  
        </div>
    
    );
  }

}
