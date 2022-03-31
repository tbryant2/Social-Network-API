const moment = require('moment');
const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction'); 

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength:280
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: createdAtVal => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String, 
            required: true 
        }, 
        reactions: [reactionSchema]
    }, 
    {
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
        id: false
    }
); 

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.reduce(
        (total, reactionCount) => total + reactionCount.length + 1,
        0
    );
})

const Thought = model('Thought', ThoughtSchema); 

module.exports = Thought; 