import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToDoList } from './ToDoList';

export const Task = () => {
  const navigate = useNavigate();

  const tarefas = [
    { title: 'Comprar pão', user: 'Eduardo' },
    { title: 'Estudar React', user: 'Rafael' },
    { title: 'Lavar a louça', user: 'João' },
  ];

  return (
    <div>
      <h1>Lista de Tarefas</h1>
        <ToDoList tasks={tarefas} />
      <button onClick={() => Meteor.logout()}>Logout</button>
    </div>
  );
}
