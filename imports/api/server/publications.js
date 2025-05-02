import { Meteor } from 'meteor/meteor';
import { Tasks } from '../tasks';

Meteor.publish('tasks', function () {
  return Tasks.find({}, { sort: { createdAt: -1 } });
}); 