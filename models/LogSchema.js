const Mongoose = require('mongoose');

const log_schema = new Mongoose.Schema({
    _id: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    log: {
        type: Array,
        required: true
    }
},
    {
        collection: 'logs'
    }
);

module.exports = Mongoose.model('LogModel', log_schema);