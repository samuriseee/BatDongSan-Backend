const express = require("express");
const employee_router = express.Router();
const connection = require("../database/connection");
const { executeQuery, getOne, create } = require("../database/query");

employee_router.get("/getAllEmployee", async (req, res) => {    //hiện data
    connection.query("SELECT * FROM nhanvien ", (err, rows) => {
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

employee_router.post("/createEmployee", async function (req, res) {
    // get data from req body
    const { TenNhanVien, MaBoPhan, SoDienThoai, Email, NgaySinh } = req.body;
    connection.query(
        "SELECT * from nhanvien where Email = ?", Email,
        (err, rows) => {
            if (err) {
                return res.json({
                    message: "Email đã tồn tại",
                });
            }

            connection.query(
                "INSERT INTO nhanvien (TenNhanVien, MaBoPhan, SoDienThoai, Email, NgaySinh) VALUES (?, ?, ?, ?, ?)",
                [TenNhanVien, MaBoPhan, SoDienThoai, Email, NgaySinh],
                (err, rows) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            message: "Đăng ký thất bại",
                        });
                    }
                    if (rows) {
                        return res.status(200).json({
                            message: "Đăng ký thành công",
                        });
                    }
                }
            );
        }
    );
});




module.exports = employee_router;
