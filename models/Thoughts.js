const { Timestamp } = require('bson');
const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reactions');
const dateFormat = require('../utils/dateFormat');

// Schema to create a course model
const thoughtSchema = new Schema(
    {
        thoughtPost: {

        },
        createdAt: {
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
