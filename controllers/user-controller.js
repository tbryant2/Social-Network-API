const { User, Thought } = require('../models');

const userController = {
    // get all users
    getUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserdata => res.json(dbUserdata))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //get single user 
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .populate("friends")
            .populate("thoughts")
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "no user found with this ID!" });
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createUser 
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $set: body }, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserdata) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
        })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }, 

    // add Friend 
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: {friends: params.friendId} }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No Friend found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete Friend 
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: {friends: params.friendId} }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No Friend found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
}






module.exports = userController; 