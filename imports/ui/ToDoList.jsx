import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export function ToDoList() {

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Comprar pão', user: 'Eduardo' },
    { id: 2, title: 'Estudar React', user: 'Rafael' },
    { id: 3, title: 'Lavar a louça', user: 'João' },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleMenuClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  }

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleRemove = () => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTaskId));
    handleClose();
  }


  const handleEdit = () => {
    // Lógica sera implementada logo
    handleClose();
  };

  return (
    <List>
      {tasks.map(task => (
        <ListItem
          key={task.id}
          secondaryAction={
            <>
              <IconButton onClick={(e) => handleMenuClick(e, task.id)}>
                <MoreVertIcon />
              </IconButton>
            </>
          }
          >
          <ListItemText primary={task.title} />
        </ListItem>
      ))}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleRemove}>Remover</MenuItem>
      </Menu>
    </List>
  );
}