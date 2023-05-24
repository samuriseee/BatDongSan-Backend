const express = require("express");
const user_router = express.Router();
const connection = require("../database/connection");

user_router.get("/", (req, res) => {
  connection.query("SELECT * FROM nguoidung where role ='user'", (err, rows) => {
    if (err) {
      return res.json({
        message: "Lỗi",
      });
    }
    if (rows) {
      return res.json(rows);
    }
  });
});

user_router.get("/UserDetail/:id", (req, res) => {
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

user_router.post("/updateUser_ThanhEmployee", (req, res) => {
  const id = req.body.idU;
  connection.query(
    "update NguoiDung set role = 'employee' where id =?",
    [id],
    (err) => {
      if (err) {
        return res.json({ message: "lỗi" });
      }
    }
  );
});


user_router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM nguoidung WHERE id = ?",
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

user_router.delete("/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM nguoidung WHERE id = ?", [id], (err, rows) => {
    if (err) {
      return res.json({
        message: "Lỗi",
      });
    }
    if (rows) {
      return res.json({
        message: "Xóa thành công",
      });
    }
  });
});

module.exports = user_router;
