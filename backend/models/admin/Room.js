const mongoose = require('mongoose');
const { Schema } = mongoose;


const roomScemSchema = new mongoose.Schema({
    name: {
        //required: [true, 'Created At is required'], 
        type: String
    },
    capacity:
    {
        type: Number,
        //required: [true, 'Created By is required']
    },
    description: {
        type: String
    },
    meetings: [{
        type: Schema.Types.ObjectId,
        ref: 'Meetings'
    }]
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals: true
    },
    timestamps: true
})

const Room = mongoose.model('Room', roomScemSchema);

module.exports = Room;