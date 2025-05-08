import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TextField, Button } from '@mui/material';
import { Tasks } from '/imports/api/tasks';

export const Edicao = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  // Obtemos o usuário atual logado
  const user = useTracker(() => Meteor.user(), []);
  const username = user?.username || 'Usuário';

  // Carrega a tarefa a partir do banco de dados
  const task = useTracker(() => {
    return Tasks.findOne(taskId);
  }, [taskId]);

  // Estados locais para os campos do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Preenche os campos com os dados da tarefa carregada
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  // Atualiza a tarefa no banco de dados
  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      situacao: 'Cadastrada',
      user: username,
    };

    Meteor.call('tasks.update', taskId, taskData, (err) => {
      if (err) {
        console.error('Erro ao atualizar tarefa:', err);
      } else {
        navigate('/tasks');
      }
    });
  };

  return (
    <>
      <h2>Editar Tarefa</h2>

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

        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </form>
    </>
  );
};
