const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsID
router.route('/:thoughtsId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtsID
router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtsID/reactions
router.route('/:thoughtsId/reactions').post(addReaction);

// /api/thoughts/:thoughtsID/reactions/:friendId
router.route('/:thoughtsId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
