const { Thoughts, Reactions } = require('../models');

const reactionCount = async () =>
  Thoughts.aggregate()
    .count('reactionCount')
    .then((numberOfThougts) => numberOfThougts);

const thoughtController = {
    // CRUD commands
    // Get all
    getThoughts(req, res) {
        Thoughts.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                    reactionCount: await reactionCount(),
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // get one 
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({
                        thought,
                        // ????
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // post a new thought 
    createThought(req, res) {
        Thoughts.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
    },
    // delete thought
      deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No such thought exists' })
              : Thoughts.findOneAndUpdate(
                  { thoughts: req.params._id },
                  { $pull: { $in: req.params.thoughtsId} },
                  { new: true }
                )
          )
          .then((thoughts) =>
            !thoughts
              ? res.status(404).json({
                  message: 'Thought deleted, but no thoughtss found',
                })
              : res.json({ message: 'Thought successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // update thought
      updateThought(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // post a new friend because theyre lonely and cant live by themselves 
      addReaction(req, res) {
        console.log('You are adding a new reaction');
        console.log(req.body);
        Thoughts.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { reaction: req.params.reactionId } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // delete a new friend because they can live by themselves =)
      removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
          { _id: req.params._id },
          { $pull: { friends: { reactionID: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
};

module.exports = thoughtController;