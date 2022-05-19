const router = require('express').Router();



const {
  getusers,
  getSingleUsers,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getusers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUsers).delete(deleteUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUsers).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/Friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
