import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    situacao: 'pendente',
    user: Meteor.user()?.username || 'Anônimo',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('O título é obrigatório');
      return;
    }

    if (!formData.dueDate) {
      formData.dueDate = new Date().toISOString().split('T')[0];
    }
    
    Meteor.call('tasks.insert', formData, (error) => {
      if (error) {
        alert(error.message || 'Erro ao criar tarefa');
      } else {
        navigate('/');
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
      }}
    >
      <h2>Adicionar Nova Tarefa</h2>
      
      <TextField
        required
        name="title"
        label="Título"
        value={formData.title}
        onChange={handleChange}
      />

      <TextField
        name="description"
        label="Descrição"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
      />

      <TextField
        name="dueDate"
        label="Data de Conclusão"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        name="situacao"
        label="Situação"
        select
        value={formData.situacao}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
      >
        <option value="pendente">Pendente</option>
        <option value="em_andamento">Em Andamento</option>
        <option value="concluida">Concluída</option>
      </TextField>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </Box>
    </Box>
  );
}; 