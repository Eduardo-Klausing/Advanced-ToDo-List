import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
    
export const MyDrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const currentUserId = useTracker(() => {
        return Meteor.userId();
    });

    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
            <ListItem disablePadding>
            <ListItemButton component={Link} to="/tasks">
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Lista de Tarefas"/>
            </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton component={Link} to={`/perfil/${currentUserId}`}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Editar Perfil"/>
            </ListItemButton>
            </ListItem>
        </List>
    </Box>
    );

    return (
        <div>
        <Button onClick={toggleDrawer(true)}>
            <MenuIcon />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
        </div>
    );

    };


   