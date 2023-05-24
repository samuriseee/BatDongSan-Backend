const express = require("express");
const employee_router = express.Router();
const connection = require("../database/connection");
// const { post } = require("./employee");
require("dotenv").config();

// const {
//     hashPassword,
//     hashPasswordAlreadyHaveSalt,
//   } = require("../../hash/hash");

employee_router.get("/getAllEmployee", async (req, res) => {    //hiện data
    connection.query("SELECT * FROM NguoiDung where role = 'employee'", (err, rows) => {
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

employee_router.get("/Employee_Detail/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
      "SELECT * FROM NguoiDung WHERE ID = ?;",
      [id],
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
  });

employee_router.post("/updateEmployee_ThanhUser", (req, res) => {
    const idU = req.body.idU;
    connection.query(
        "update NguoiDung set role = 'user' where id =?",
          [idU],
        (err) => {
            if (err) {
                return res.json({ message: 'Lỗi' });
            }
        }
    );
});



// const { executeQuery, getOne, create } = require("../../database/query");

// employee_router.post("/createEmployee", async function (req, res) {
//     // get data from req body
//     const { name, phone, password, email, role } = req.body;
//     connection.query(
//         "SELECT * from nguoidung where Email = ?",
//         email,
//         (err, rows) => {
//             if (err) {
//                 return res.json({
//                     message: "Email đã tồn tại",
//                 });
//             }
//             const { encyptedPassword, salt } = hashPassword(password);
//             connection.query(
//                 "INSERT INTO nguoidung (HoTen, SDT, Email, Password, salt, role) VALUES (?, ?, ?, ?, ?,?)",
//                 [name, phone, email, encyptedPassword, salt, role],
//                 (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         return res.json({
//                             message: "Đăng ký thất bại",
//                         });
//                     }
//                     if (rows) {
//                         return res.status(200).json({
//                             message: "Đăng ký thành công",
//                         });
//                     }
//                 }
//             );
//         }
//     );
// });


// employee_router.post("/createEmployee", async function (req, res) {
//     // get data from req body
//     const { TenNhanVien, MaBoPhan, SoDienThoai, Email, NgaySinh } = req.body;
//     connection.query(
//         "SELECT * from NguoiDung where Email = ?", Email,
//         (err, rows) => {
//             if (err) {
//                 return res.json({
//                     message: "Email đã tồn tại",
//                 });
//             }
//             connection.query(
//                 "INSERT INTO NguoiDung (HoTen, MaBoPhan, SDT, Email, role) VALUES (?, ?, ?, ?, 'employee')",
//                 [HoTen, MaBoPhan, SDT, Email],
//                 (err, rows) => {
//                     if (err) {
//                         console.log(err);
//                         return res.json({
//                             message: "Đăng ký thất bại",
//                         });
//                     }
//                     if (rows) {
//                         return res.status(200).json({
//                             message: "Đăng ký thành công",
//                         });
//                     }
//                 }
//             );
//         }
//     );
// });


module.exports = employee_router;