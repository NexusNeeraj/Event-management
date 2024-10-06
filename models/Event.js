const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, 
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    maxParticipants: { 
        type: Number, 
        required: true
    },
    confirmedParticipants: [
        {
            userId: String,
            name: String,
        }
    ],
    waitlist: [
        {
            userId: String,
            name: String,
            position: Number,
        }
    ],
});

module.exports = mongoose.model('Event', EventSchema);