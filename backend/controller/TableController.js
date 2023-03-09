const asyncHandler = require("express-async-handler");
const Table = require("../models/TableModel");

exports.tableCreate = asyncHandler(async (req, res, next) => {
    try {
        const { tablesCount } = req.body;
        if (isNaN(tablesCount) || tablesCount < 1) {
            res.status(400).send('Invalid input');
        } else {
            const tables = [];
            for (let i = 1; i <= tablesCount; i++) {
                const table = new Table({
                    userId: req.user._id,
                    TableNumber: { "Table Number": i }
                });
                await table.save();
                tables.push(table);
            }
            res.send(tables);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create tables",
            error: error.message,
        });
    }
})