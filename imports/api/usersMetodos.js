import { Users } from "./users";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

Meteor.methods({
    async 'usersProfile.update'(userId, updatedUser){
    try {
      check(userId, String);
      check(updatedUser, {
        name: String,
        email: String,
        birthDate: String,
        gender: String,
        company: String,
        photo: Match.OneOf(String, null), // se for base64 ou URL
      });
  
        return await Users.updateAsync(userId, {
            $set: {
                ...updatedUser,
                updatedAt: new Date(),
            },
        });
    } catch(error){
        throw new Meteor.Error('update-failed', error.message);
    }
    },
});