import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon'
import InboxIcon from '@mui/icons-material/Inbox'

export function ToDoList({ tasks }) {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            primary={task.title}
            secondary={task.user}
          />
        </ListItem>
      ))}
    </List>
  );
}