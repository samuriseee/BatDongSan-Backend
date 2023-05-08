const express = require("express");
const post_router = express.Router();
const connection = require("../database/connection");
const { executeQuery, getOne, create } = require("../database/query");

post_router.get("/getAllPost", async (req, res) => {
    connection.query("SELECT * FROM tindang inner join batdongsan where tindang.IDbatdongsan = batdongsan.ID", (err, rows) => {
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
});


module.exports = post_router;
