import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

export const Adicao = () => {
    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const username = user?.username || 'Usuário';
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Chama método Meteor para inserir task (deve existir em /imports/api/tasks.js)
      Meteor.call('tasks.insert', { title, description, dueDate, situacao: 'Cadastrada', user: username }, (err) => {
        if (!err) navigate('/tasks');
        else console.error(err);
      });
      navigate('/tasks');
    };
  
    return (
      <Box
        component={Paper}
        elevation={3}
        sx={{
          maxWidth: 600,
          margin: '2rem auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <Typography variant="h5" component="h2">
          Adicionar Nova Tarefa
        </Typography>
  
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
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
  
          <TextField
            label="Data"
            value={dueDate}
            required
            onChange={(e) => setDueDate(e.target.value)}
          />
  
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </form>
      </Box>
    );
};