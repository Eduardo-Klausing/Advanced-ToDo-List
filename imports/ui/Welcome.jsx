import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      gap: '1 rem'
    }}>
      <h1>To-do List</h1>

      <p style={{ fontSize: '1.25rem' }}>
        Tarefas, prazos e muito mais
      </p>

      <button onClick={() => navigate('/login')}>
        Fazer Login
      </button>
    </div>
  );
};
