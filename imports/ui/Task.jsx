import React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';


export const Task = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <button onClick={() => Meteor.logout()}>Logout</button>
    </div>
  );
}
