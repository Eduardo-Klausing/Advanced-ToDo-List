import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Tasks } from '../api/tasks';
import { Box } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const Task = () => {
  const navigate = useNavigate();

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

  const handleEdit = () => {
    if (selectedTaskId) {
      navigate(`/edicao/${selectedTaskId}`,  { state: { origem: 'Editar Tarefa' } });
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

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <h1>Lista de Tarefas</h1>

      <List>
        {tasks && tasks.length > 0 ? (
          tasks.map(task => (
            <ListItem
              key={task._id}
              sx={{ 
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                boxShadow: 1
              }}
              secondaryAction={
                <IconButton onClick={(e) => handleMenuClick(e, task._id)}>
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>

              <ListItemText 
                primary={task.title} 
                secondary={`${task.user} • Situação: ${task.situacao || 'Cadastrada'}`} 
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

      <button onClick={() => Meteor.logout()}>Logout</button>
    </Box>
  );
};
