import React, { Fragment } from 'react';
import { LoginForm } from './LoginForm';
import { useTracker } from 'meteor/react-meteor-data';


export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div className="main">
        {user ? (
          <Fragment>
              <p>nada</p>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
  );
};
