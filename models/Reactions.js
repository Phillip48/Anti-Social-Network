// Require whats needed
const { ObjectId } = require('mongoose').Types;
const { Schema, Types } = require('mongoose');

// Create schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true
            // virtuals: true,
        },
        id: false,
    }

);

module.exports = reactionSchema;
