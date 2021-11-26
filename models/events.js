const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventSchema = new Schema({
    id: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: true
    },
    Name: {
        type: String,
        require: true,
        unique: false
    },
    Location: {
        type: String,
        require: true,
        unique: false
    },
    Date: {
        type: String,
        require: true,
        unique: false
    },
    Details: {
        type: String,
        require: false,
        unique: false
    },
    MaxCapacity: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: false
    }
});

module.exports=mongoose.model('Event', eventSchema);;



