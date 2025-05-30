import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Tasks } from '../api/tasks';
import { Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const Task = () => {
  const navigate = useNavigate();

  const user = useTracker(() => Meteor.user(), []);
  const username = user?.username;
  
  const currentUserId = useTracker(() => {
    return Meteor.userId();
  });

  const { tasks, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('tasks');
    
    if (!handle.ready()) {
      return { tasks: [], isLoading: true };
    }

    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
      isLoading: false
    };

  });
  
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const selectedTask = tasks.find(t => t._id === selectedTaskId);

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleRemove = () => {
    if (selectedTaskId) {
      Meteor.call('tasks.remove', selectedTaskId, (error) => {
        if (error) {
          alert(error.message);
        }
      });
    }
    handleClose();
  };

  const handleOngoing = () => {
    if(selectedTaskId) {
      Meteor.call('tasks.updateStatus', selectedTaskId, 'Em andamento', (error) => {
        if (error) alert(error.message);  
      });
      handleClose();
    }
  };

  const handleConclude = () => {
      if(selectedTaskId) {
      Meteor.call('tasks.updateStatus', selectedTaskId, 'Concluída', (error) => {
        if (error) alert(error.message);  
      });
      handleClose();
    }
  }

  const handleRegister = () => {
      if(selectedTaskId) {
      Meteor.call('tasks.updateStatus', selectedTaskId, 'Cadastrada', (error) => {
        if (error) alert(error.message);  
      });
      handleClose();
    }
  }


  const handleAdd = () => {
    navigate('/adicao');
  };

  const handleEdit = () => {
    if (selectedTaskId) {
      navigate(`/edicao/${selectedTaskId}`,  { state: { origem: 'Editar Tarefa' } });
    }
  handleClose();
};

  const handleUserProfile = () => {
    navigate(`/perfil/${currentUserId}`);
  };
 
  if (isLoading) {
    return <div>Carregando...</div>;
  }

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
      <Box sx={{ padding: 2 }}>
        <h1>Lista de Tarefas</h1>

        <List>
          {tasks && tasks.length > 0 ? (
            tasks
              .filter(task => !task.pessoal || task.user === username)
              .map(task => (
                <ListItem
                  key={task._id}
                  sx={{ 
                    bgcolor: 'background.paper',
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 1
                  }}
              secondaryAction={
                // só mostra o menu se o username bater com task.user
                username === task.user
                  ? (
                      <IconButton onClick={(e) => handleMenuClick(e, task._id)}>
                        <MoreVertIcon />
                      </IconButton>
                    )
                  : null
              }
                >
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>

                <ListItemText 
                  primary={task.title} 
                  secondary={`${task.user}${task.pessoal ? ' (Tarefa pessoal)' : ''} • Situação: ${task.situacao || 'Cadastrada'}`} 
                  />
                </ListItem>
                
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Nenhuma tarefa encontrada" />
              </ListItem>
            )}
        </List>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleRemove}>Remover</MenuItem>

          {selectedTask && selectedTask.situacao === 'Cadastrada' && (
            // Caso 1: cadastrada → só “Colocar em andamento”
            <MenuItem onClick={handleOngoing}>Colocar em andamento</MenuItem>
          )}

          {selectedTask && selectedTask.situacao === 'Em andamento' && ( 
            // Caso 2: em andamento → “Concluir” e “Colocar como Cadastrada”
            <>
              <MenuItem onClick={handleConclude}>Concluir</MenuItem>
              <MenuItem onClick={handleRegister}>Colocar como Cadastrada</MenuItem>
            </>
          )}

          {selectedTask && selectedTask.situacao === 'Concluída' && (
            // Caso 3: concluída → só “Colocar como Cadastrada”
                <MenuItem onClick={handleRegister}>Colocar como Cadastrada</MenuItem>
          )}

        </Menu>

        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAdd}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>

        <button onClick={() => Meteor.logout()} style={{ marginRight: '8px' }}>Logout</button>
        <button onClick={handleUserProfile}>Informações de usuário</button>
      </Box>
    </div>
  );
};
