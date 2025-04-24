import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { Welcome } from './Welcome';
import { Task } from './Task';


export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <Routes>
      <Route
          path="/"
          element={user ? <Navigate to="/welcome" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate to="/welcome" />}
        />
        <Route
          path="/welcome"
          element={user ? <Welcome /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks"
          element={user ? <Task /> : <Navigate to="/login" />}
        />
      </Routes>
  );
};
