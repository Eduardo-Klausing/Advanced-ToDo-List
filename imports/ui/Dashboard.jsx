import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks'; // Ajuste o caminho conforme sua estrutura
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ou 'useHistory' para versões antigas do react-router

export const Dashboard = () => {
  const navigate = useNavigate(); // para navegação entre páginas

  const { total, andamento, concluidas } = useTracker(() => {
    const allTasks = Tasks.find({}).fetch();
    console.log(allTasks);
    const total = allTasks.length;
    const andamento = allTasks.filter(task => !task.completed).length;
    const concluidas = allTasks.filter(task => task.completed).length;

    return { total, andamento, concluidas };
  });

  const cards = [
    { title: 'Tarefas Cadastradas', value: total },
    { title: 'Tarefas em Andamento', value: andamento },
    { title: 'Tarefas Concluídas', value: concluidas },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard de Tarefas</Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ minHeight: 100 }}>
              <CardContent>
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="h4">{card.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={() => navigate('/tasks')}>
          Ver todas as tarefas
        </Button>
      </Box>
    </Box>
  );
};
