const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            //  Regex for email        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);

module.exports = User;
