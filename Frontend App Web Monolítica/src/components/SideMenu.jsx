import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function Sidemenu({ open, toggleDrawer }) {
  const menuItems = [
    { text: "Inicio", link: "/home", icon: <HomeIcon />},
    { text: "Registrar Cliente", link: "/clients/create", icon: <PersonAddIcon />},
    { text: "Simulador de Préstamos", link: "/simulador", icon: <LinearScaleIcon />},
    { text: "Mis Solicitudes", link: "/miSolicitudes", icon: <AssignmentIcon />},
    { text: "Solicitar Préstamo", link: "/prestamo", icon: <MonetizationOnIcon />},
  ];

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)} 
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                {item.icon} 
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}