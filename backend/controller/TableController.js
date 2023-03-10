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
            let count = table.TableNumber;
            if (!count) {
                table = new Table({
                    userId: req.user._id,
                    TableNumber: tablesCount,
                });
            } else {
                count = count
            }

            await table.save();
        }

        res.status(201).json({
            success: true,
            message: "Tables Rigesterd Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create tables",
            error: error.message,
        });
    }
});

exports.getTablebyUserId = asyncHandler(async (req, res, next) => {
    let tablesCount = await Table.findOne({ userId: { $in: req.user.id } });
    let count = tablesCount.TableNumber;

    console.log(tablesCount);
    const tables = [];
    for (let i = 1; i <= count; i++) {
        const table = {
            userId: req.user._id,
            TableNumber: i,
        };

        tables.push(table);
    }

    res.status(200).json({
        success: true,
        message: "Tables Get Successfully",
        tables: tables,
    });
});

exports.getTableCountbyUserId = asyncHandler(async (req, res, next) => {
    let tablesCount = await Table.findOne({ userId: { $in: req.user.id } });
    let count = tablesCount.TableNumber;

    res.status(200).json({
        success: true,
        message: "Table Count Get Successfully",
        tables: count,
    });
});
