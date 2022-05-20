const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

const friendCount = async () => 
    User.aggregate()
    .count('userFriends')
    .then((numberOfFriends) => numberOfFriends);


const userController = {
    // CRUD commands
    // Get all
    getUser(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    userCount: await friendCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // get one 
    getSingleUser(req, res) {
        User.findOne({ _id: req.params._id })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                        // ????
                        friendCount: await friendCount(),
                        // ????
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // post a new user 
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },
    // delete user
      deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params._id })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : Course.findOneAndUpdate(
                  { users: req.params._id },
                  { $pull: { users: req.params._id } },
                  { new: true }
                )
          )
          .then((course) =>
            !course
              ? res.status(404).json({
                  message: 'Student deleted, but no courses found',
                })
              : res.json({ message: 'Student successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // update user
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params._id },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // post a new friend because theyre lonely and cant live by themselves 
      addFriend(req, res) {
        console.log('You are adding a new friend');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params._id },
          { $addToSet: { friends: req.body } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // delete a new friend because they can live by themselves =)
      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params._id },
          { $pull: { friends: { friendsId: req.params.friendsId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
};


module.exports = userController;
