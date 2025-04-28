import React from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from './ToDoList';

export const Task = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Lista de Tarefas</h1>
        <ToDoList />
      <button onClick={() => Meteor.logout()}>Logout</button>
    </div>
  );
}
