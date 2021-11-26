const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var incrementSchema = new Schema({
    eid: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: false,
        default: 0
    },
    pid: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: false,
        default: 0
    }
});

module.exports=mongoose.model('Increment', incrementSchema);;




