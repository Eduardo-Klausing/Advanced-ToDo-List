import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { Welcome } from './Welcome';
import { Task } from './Task';
import { Edicao } from './Edicao';
import { Adicao } from './Adicao';
import { Perfil } from './Perfil';
import { Dashboard } from './Dashboard';


export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <Routes>
      <Route
          path="/"
          element={<Welcome />}
        />
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/welcome"
          element={<Welcome />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/tasks"
          element={user ? <Task /> : <Navigate to="/" />}
        />
        <Route
          path="/edicao"
          element={<Edicao />}
        />
        <Route
          path="/edicao/:taskId"
          element={<Edicao />}
        />
        <Route
          path="/adicao"
          element={<Adicao />} 
        />
        <Route
          path="/perfil/:userId"
          element={<Perfil />}
        />
      </Routes>
  );
};
