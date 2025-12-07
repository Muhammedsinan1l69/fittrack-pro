// server/models/user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Every email must be unique
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'] // Restricts the value to one of these
    },
    contactNumber: {
        type: String,
        required: true
    },
    height: { // In centimeters
        type: Number,
        default: 0
    },
    weight: { // In kilograms
        type: Number,
        default: 0
    }
}, {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;