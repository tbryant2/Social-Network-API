const router = require('express').Router(); 
const { route } = require('.');

const {
    getAllThoughts, 
    getThoughtById,
    newThought, 
    updateThought, 
    removeThought, 
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller'); 

router 
    .route('/')
    .get(getAllThoughts)
    .post(newThought); 


router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought); 


router
    route('/:thoughtId/reactions')
    .post(addReaction); 


router 
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction); 


module.exports = router; 