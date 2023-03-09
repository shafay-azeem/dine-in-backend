const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    TableNumber: [{
        type: String,
        required: true
    }]
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;