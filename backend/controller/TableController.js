const asyncHandler = require("express-async-handler");
const Table = require("../models/TableModel");

exports.tableCreate = asyncHandler(async (req, res, next) => {
    let table
    try {
        const { tablesCount } = req.body;
        if (isNaN(tablesCount) || tablesCount < 1) {
            res.status(400).send("Invalid input");
        } else {
            table = await Table.findOne({ userId: { $in: req.user.id } });

            if (!table) {
                const tables = [];
                for (let i = 1; i <= tablesCount; i++) {
                    const table = {
                        TableNumber: i,
                        TableName: "A-" + i,
                    };

                    tables.push(table);
                }
                table = new Table({
                    userId: req.user._id,
                    Table: tables,
                });
            } else {
                const tables = [];
                for (let i = 1; i <= tablesCount; i++) {
                    const table = {
                        TableNumber: i,
                        TableName: "A-" + i,
                    };

                    tables.push(table);
                }
                table.Table = tables
            }

            await table.save();
        }

        res.status(201).json({
            success: true,
            message: "Tables Rigesterd Successfully",
            table
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
});

//--------------------------------------

exports.getTablebyUserId = asyncHandler(async (req, res, next) => {

    try {
        let tablesCount = await Table.findOne({ userId: { $in: req.user.id } });
        if (!tablesCount) {
            const error = new Error('Table not found')
            error.statusCode = 404
            throw error // it will end up in catch block followed by next thats why throw is used in async code
        }
        res.status(200).json({
            success: true,
            message: "Tables Get Successfully",
            tables: tablesCount,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
});


//--------------------------------------
exports.getTableCountbyUserId = asyncHandler(async (req, res, next) => {
    try {
        let tablesCount = await Table.findOne({ userId: { $in: req.user.id } });
        if (!tablesCount) {
            const error = new Error('Table not found')
            error.statusCode = 404
            throw error // it will end up in catch block followed by next thats why throw is used in async code
        }
        let count = tablesCount.Table.length
        res.status(200).json({
            success: true,
            message: "Table Count Get Successfully",
            tables: count,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
});


//-----------------------------------------------------------------
exports.deleteTableDeleteByTableId = asyncHandler(async (req, res, next) => {
    try {
        let tableId = req.params.tableId
        let tablesCount = await Table.findOne({ userId: { $in: req.user.id } });
        if (!tablesCount) {
            const error = new Error('Table not found')
            error.statusCode = 404
            throw error // it will end up in catch block followed by next thats why throw is used in async code
        }
        let table = tablesCount.Table.find((table) => table._id.toString() === tableId.toString())
        tablesCount.Table.pull(table._id)
        await tablesCount.save();

        res.status(200).json({
            success: true,
            message: "Table Deleted Successfully",

        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
});

//---------------------------------------------
exports.updateTableByTableId = asyncHandler(async (req, res, next) => {
    try {
        let tableId = req.params.tableId
        const tabelData = req.body;
        let tablesCount = await Table.findOne({ userId: { $in: req.user.id } });
        if (!tablesCount) {
            const error = new Error('Table not found')
            error.statusCode = 404
            throw error // it will end up in catch block followed by next thats why throw is used in async code
        }
        let table = tablesCount.Table.find((table) => table._id.toString() === tableId.toString())
        Object.assign(table, tabelData);
        await tablesCount.save();

        res.status(200).json({
            success: true,
            message: "Table Updated Successfully",

        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
});
//-----------------------------------------
exports.updateTableStatus = asyncHandler(async (req, res, next) => {
    try {
        let tableId = req.params.tableId
        const status = req.body;
        let tablesCount = await Table.findOne({ userId: { $in: req.user.id } });
        if (!tablesCount) {
            const error = new Error('Table not found')
            error.statusCode = 404
            throw error // it will end up in catch block followed by next thats why throw is used in async code
        }
        let table = tablesCount.Table.find((table) => table._id.toString() === tableId.toString())

        table.TableStatus = status.TableStatus
        await tablesCount.save();

        res.status(200).json({
            success: true,
            message: status.TableStatus ? "Table Enabled Successfully" : "Table Disabled Successfully",

        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
});
