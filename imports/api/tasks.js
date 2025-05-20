import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  async 'tasks.insert'(task) {
    try {
      check(task, {
        title: String,
        description: String,
        dueDate: String,     
        pessoal: Boolean,
        situacao: String,
        user: String,
      });

      const userId = this.userId || null;
      const taskToInsert = {
        ...task,
        createdAt: new Date(),
        owner: userId,
      };
      
      return await Tasks.insertAsync(taskToInsert);
    } catch (error) {
      throw new Meteor.Error('insert-failed', error.message);
    }
  },

  async 'tasks.remove'(taskId) {
    check(taskId, String);
    return await Tasks.removeAsync(taskId);
  },

  async 'tasks.updateStatus'(taskId, newStatus){
    check(taskId, String);
    check(newStatus, String);

    return await Tasks.updateAsync(taskId, {
      $set: { situacao: newStatus }
    });
  },

  async 'tasks.update'(taskId, updatedTask) {
    try {
      check(taskId, String);
      check(updatedTask, {
        title: String,
        description: String,
        dueDate: String,
        pessoal: Boolean,
        situacao: String,
        user: String,
      });
  
      return await Tasks.updateAsync(taskId, {
        $set: {
          ...updatedTask,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Meteor.Error('update-failed', error.message);
    }
  },
  
});