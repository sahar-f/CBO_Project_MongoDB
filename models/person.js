const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var personSchema = new Schema({
    id: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: true
    },
    LastName: {
        type: String,
        require: true,
        unique: false
    },
    FirstName: {
        type: String,
        require: true,
        unique: false
    },
    Age: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: false
    },
    FamilySize: {
        type: Number,
        require: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        },
        unique: false
    },
    DietRestrictions: {
        type: String,
        require: false,
        unique: false
    }
});

module.exports=mongoose.model('Person', personSchema);




