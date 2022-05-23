const { Timestamp } = require('bson');
const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reactions');
// const dateFormat = require('../utils/dateFormat');

// Schema to create a course model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        reaction: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            // getters: true
        },
        id: false
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
