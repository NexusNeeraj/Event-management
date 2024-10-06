const express = require('express');

const { createEvent, joinEvent, viewParticipants, cancelParticipation } = require("../controllers/eventController");

const router = express.Router();

router.post('/events', createEvent);
router.post('/events/:eventId/join', joinEvent);
router.get('/events/:eventId/participants', viewParticipants);
router.delete('/events/:eventId/participants/:userId', cancelParticipation);

module.exports = router;