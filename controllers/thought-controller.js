const { request } = require('express');
const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then(dbThoughtdata => res.json(dbThoughtdata))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get single thought 
    getSingleThought(req, res) {
        Thought.findOne({ _id: request.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "no thought found with this ID!" });
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create a thought 
    createThought({ params, body }, res) {
        Thought.create(body)
          .then(({ dbThoughtData }) => {
            return User.findOneAndUpdate(
              { _id: body.UserId },
              { $push: { thoughts: body.UserId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json({message: 'Thought created!'});
          })
          .catch(err => res.json(err));
    },

    //update a thought 
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, { $set: body }, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

     // delete thought
     deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            return User.findOneAndUpdate(
                { thoughts: params.thoughtId }, 
                { $pull: {thoughts: params.thoughtId}}, 
                { new: true }
            )
        })
            .then((dbThoughtData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No Thought found with this id!' })
                }
                res.json(dbThoughtData)})
            .catch(err => res.json(err));
    }, 

    // add reaction to thought 
    addReaction({ params, body }, res) {
             Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $addToSet: { reactions: body } },
              { new: true, runValidators: true }
            )
          .then(dbThoughtData => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    // remove reaction 
    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { reactions: {reactionId: params.reactionId} } },
         { new: true, runValidators: true }
       )
     .then(dbThoughtData => {
       console.log(dbThoughtData);
       if (!dbThoughtData) {
         res.status(404).json({ message: 'No Thought found with this id!' });
         return;
       }
       res.json(dbThoughtData);
     })
     .catch(err => res.json(err));
},
}














module.exports = thoughtController; 