const express = require("express");
const real_estate_router = express.Router();
const connection = require("../database/connection");
const {
    executeQuery,
    getOne,
    create
} = require("../database/query");
real_estate_router.get("/getAllBuyTypes", async (req, res) => {
    try {
        const allBuyTypes = await executeQuery({ db: connection, query: "SELECT * from loaibds where BanHayChoThue = 1" });
        if(allBuyTypes) return res.json(allBuyTypes);
        return res.json({
            message: "Không có dữ liệu"
        });
    }
    catch(err) {
        return res.json({
            message: "Lỗi"
        });
    }
});

real_estate_router.get("/getAllRentTypes", (req, res) => {
    connection.query(
        "SELECT * from loaibds where BanHayChoThue = 0",
        (err, rows) => {
        if (err) {
            return res.json({
            message: "Lỗi",
            });
        }
        if (rows) {
            return res.json(rows);
        }
        }
    );
    }
);


module.exports = real_estate_router;