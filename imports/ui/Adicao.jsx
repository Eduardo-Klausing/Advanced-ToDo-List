import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { FormControlLabel, Switch, TextField, Button, Paper, Typography, Box } from '@mui/material';

export const Adicao = () => {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const username = user?.username || 'Usuário';
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isPessoal, setIsPessoal] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Chama método Meteor para inserir task (deve existir em /imports/api/tasks.js)
      Meteor.call('tasks.insert', { title, description, dueDate, pessoal: isPessoal, situacao: 'Cadastrada', user: username }, (err) => {
        if (!err) navigate('/tasks');
        else console.error(err);
      });
      navigate('/tasks');
    };
  
    return (
    <>
      <h2>
        Adicionar Nova Tarefa
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Nome"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Descrição"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Data"
          value={dueDate}
          required
          onChange={(e) => setDueDate(e.target.value)}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isPessoal}
              onChange={(e) => setIsPessoal(e.target.checked)}
            />
          }
          label="Tarefa pessoal"
        />
        

        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </form>
    </>
    );
};