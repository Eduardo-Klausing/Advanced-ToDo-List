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
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Users } from '../api/users';
    
export const MyDrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const currentUserId = Meteor.userId();
    const currentUserData = useTracker(() => {
        const userId = Meteor.userId();
        if (!userId) return null;
        return Users.findOne({ userId });
    }, []);

    const { user, isLoading } = useTracker(() => {
    if (!currentUserId) {
    return { user: null, isLoading: false };
    }
    const handle = Meteor.subscribe('usersProfile', currentUserId);
    if (!handle.ready()) {
    return { user: null, isLoading: true };
    }
    const u = Users.findOne({ _id: currentUserId });
    return { user: u, isLoading: false };
    }, [currentUserId]);

    const name = user?.name || 'Usuário';
    const email = user?.email || 'email@exemplo.com';
    const photo = user?.photo || '';

    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar
            alt={name}
            src={photo}
            sx={{ width: 64, height: 64, mb: 1 }}
        />
      <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>
      <Typography variant="body2" color="textSecondary">{email}</Typography>
    </Box>
    
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


   