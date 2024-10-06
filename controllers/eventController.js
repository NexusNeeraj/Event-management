const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, description, date, time, location, maxParticipants } = req.body;
    try {
        const newEvent = new Event({
            title,
            description,
            date, 
            time, 
            location, 
            maxParticipants,
            confirmedParticipants: [],
            waitlist: [],
        });

        await newEvent.save();
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(500).json({ error: 'Error creating event'});
    }
};

exports.joinEvent = async (req, res) => {
    const { eventId } = req.params;
    const { userId, name } = req.body;

    try {
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({ error: 'Event not found'});
        }

        // check if the user is already in the event

        if(
            event.confirmedParticipants.some(participant => participant.userId === userId) || 
            event.waitlist.some(participant => participant.userId === userId)
        ) {
            return res.status(409).json({ error: 'User already part of the event'});
        }
        // check if the event is not full
        if(event.confirmedParticipants.length < event.maxParticipants) {
            event.confirmedParticipants.push({ userId, name });
            await event.save();
            return res.status(200).json({message: 'Successfully joined the event', status: 'confirmed'});
            
        }

        //if full add user to waitlist
        const position = event.waitlist.length + 1;
        event.waitlist.push({ userId, name, position });
        await event.save();
        return res.status(200).json({message: 'Event full. Added to waitlist.', status: 'waitlisted', position});
    } catch (err) {
        res.status(500).json({ error: 'Error joining event'});
    }
};

exports.viewParticipants = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({ error: 'Event not found'});
        }

        res.status(200).json({ confirmedParticipants: event.confirmedParticipants, waitlist: event.waitlist});
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving participants'});
    }
};

exports.cancelParticipation = async (req, res) => {
    const { eventId, userId } = req.params;

    try {
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({ error: 'Event not found' });
        }

        const confirmedIndex = event.confirmedParticipants.findIndex(participant => participant.userId === userId);
        const waitlistIndex = event.waitlist.findIndex(participant => participant.userId === userId);

        if(confirmedIndex !== -1){
            event.confirmedParticipants.splice(confirmedIndex, 1);

            //move first waitlisted participant to confirmedParticipant list if available
            if(event.waitlist.length > 0){
                const firstWaitlistedUser = event.waitlist.shift();
                event.confirmedParticipants.push({ userId: firstWaitlistedUser.userId, name: firstWaitlistedUser.name});
            }

            await event.save();
            return res.status(200).json({ message: 'User removed from confirmed list. Updated waitlist.'});
        }

        // remove user from waitlist
        if(waitlistIndex !== -1){
            event.waitlist.splice(waitlistIndex, 1);
            await event.save();
            return res.status(200).json({ message: 'User removed from waitlist.' });
        }

        //user not found in confirmed or waitlist
    
        return res.status(404).json({ error: 'User not found on the list.' });
        
    } catch (err) {
        res.status(404).json({ error: 'Error removing user from event' });
    }
};