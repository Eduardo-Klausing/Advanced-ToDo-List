import { Users } from "./users";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

Meteor.methods({
  async 'usersProfile.update'(userId, updatedUser) {
    check(userId, String);
    check(updatedUser, {
      name: String,
      email: String,
      birthDate: String,
      gender: String,
      company: String,
      photo: Match.OneOf(String, null),
    });

    const existing = await Users.findOneAsync({ _id: userId });

    if (existing) {
      return await Users.updateAsync(userId, {
        $set: {
          ...updatedUser,
          updatedAt: new Date(),
        },
      });
    } else {
      return await Users.insertAsync({
        _id: userId,
        ...updatedUser,
        createdAt: new Date(),
      });
    }
  }
});