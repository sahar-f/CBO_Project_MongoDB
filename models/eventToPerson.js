const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventToPersonSchema = new Schema({
    eventId: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: false
    },
    personId: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: false
    }
});

module.exports=mongoose.model('EventToPerson', eventToPersonSchema);;




