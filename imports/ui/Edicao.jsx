// imports/ui/Edicao.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { FormControlLabel, Switch, TextField, Button, CircularProgress, Box } from '@mui/material';
import { Tasks } from '/imports/api/tasks';

export const Edicao = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  // Usuário logado
  const user = useTracker(() => Meteor.user(), []);
  const username = user?.username || 'Usuário';

  const isReady = useTracker(() => {
    const handle = Meteor.subscribe('tasks');
    return handle.ready();
  }, [taskId]);

  const task = useTracker(() => {
    if (!isReady) return null;
    return Tasks.findOne(taskId);
  }, [isReady, taskId]);

  // Estados dos campos
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  

  // Quando a subscription ficar pronta e a task existir, preenche
  useEffect(() => {
    if (isReady && task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate || '');
    }
  }, [isReady, task]);

  // Loader enquanto a subscription não estiver pronta
  if (!isReady) {
  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <CircularProgress />
    </Box>
  );
  }
  // Se for um ID inválido ou não encontrar a task
  if (isReady && !task) {
    return <p>Tarefa não encontrada.</p>;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call(
      'tasks.update',
      taskId,
      {
        title,
        description,
        dueDate,
        situacao: 'Cadastrada',
        user: username,
        pessoal: false,
      },
      (err) => {
        if (err) {
          console.error('Erro ao atualizar tarefa:', err);
        } else {
          navigate('/tasks');
        }
      }
    );
  };

  return (
    <Box maxWidth={500} mx="auto" p={2}>
      <h2>Editar Tarefa</h2>
      <form onSubmit={(e) => handleSubmit(e)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Nome"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Data de Vencimento"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Switch/>
          }
          label="Tarefa pessoal"
        />
                
        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </form>
    </Box>
  );
};
