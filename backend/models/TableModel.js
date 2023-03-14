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
            type: Number,
            required: true
        }
    }]
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;