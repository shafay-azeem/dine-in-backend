const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    Table: [{
        TableNumber: {
            type: Number,
            required: true
        },
        TableName: {
            type: String,
            required: true
        },
        TableStatus: {
            type: Boolean,
            default: true
        },
    }]
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;