import { Meteor } from 'meteor/meteor';
import { Tasks } from '../tasks';
import { Users } from '../users';

Meteor.publish('tasks', function () {
  return Tasks.find({}, { sort: { createdAt: -1 } });
}); 

Meteor.publish('usersProfile', function (userId){
  return Users.find({ _id: userId });
});