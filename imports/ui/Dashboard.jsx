import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks'; 
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

export const Dashboard = () => {
  const navigate = useNavigate(); // para navegação entre páginas

  const { cadastradas, andamento, concluidas } = useTracker(() => {
    const handler = Meteor.subscribe('tasks'); // se inscreve
    if (!handler.ready()) return { total: 0, andamento: 0, concluidas: 0 };

    const allTasks = Tasks.find({}).fetch();
    const currentUserId = Meteor.userId(); // ID do usuário logado

    // Filtra: inclui apenas se (tarefa for do user) OU (tarefa NÃO for privada)
    const userTasks = allTasks.filter(task => {
      return task.owner === currentUserId || task.pessoal === false;
    });

    const cadastradas = userTasks.filter(task => task.situacao === 'Cadastrada').length;
    const andamento = userTasks.filter(task => task.situacao === 'Em andamento').length;
    const concluidas = userTasks.filter(task => task.situacao === 'Concluída').length;

    return { cadastradas, andamento, concluidas };
  });

  const cards = [
    { title: 'Tarefas Cadastradas', value: cadastradas },
    { title: 'Tarefas em Andamento', value: andamento },
    { title: 'Tarefas Concluídas', value: concluidas },
  ];

  return (
    <Box >
      <Typography variant="h4" gutterBottom>Dashboard de Tarefas</Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid key={index}>
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
