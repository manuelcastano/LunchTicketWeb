import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink,Outlet } from 'react-router-dom';

const Sidebar = () => {
    return (
      <>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              OAF
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink  to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">Estudiantes</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Cafeteria" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Cafeterias</CDBSidebarMenuItem>
                
        
    
              </NavLink>
              <NavLink exact to="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Perfil</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Salir</CDBSidebarMenuItem>
              </NavLink>
  
              <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
      <Outlet />
      </>
    );
  };
  
  export default Sidebar;