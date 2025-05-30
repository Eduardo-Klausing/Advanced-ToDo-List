import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/users';
import '../imports/api/tasks';
import '../imports/api/server/publications';
import '../imports/api/tasksMetodos';
import '../imports/api/usersMetodos';

const usersToSeed = [
  {username: 'user1', password:'123'},
  {username: 'user2', password:'123'},
];

Meteor.startup(async () => {
  for(const { username, password } of usersToSeed){
  if (!(await Accounts.findUserByUsername(username))) {
    Accounts.createUser({ username, password });
  }
  }
});
