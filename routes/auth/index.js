const express = require("express");

const authRouter = express.Router();

const jsonwebtoken = require("jsonwebtoken");

const connection = require("../../database/connection");
const authenticateToken = require("../../middleware/authenticateToken");
const mailService = require("../../services/mail.services");
require("dotenv").config();
const secret = process.env.SECRET;
const {
  hashPassword,
  hashPasswordAlreadyHaveSalt,
} = require("../../hash/hash");
const { executeQuery, getOne, create } = require("../../database/query");

authRouter.post("/register", async function (req, res) {
  // get data from req body
  const { name, phone, password, email, role } = req.body;
  connection.query(
    "SELECT * from nguoidung where Email = ?",
    phone,
    (err, rows) => {
      if (err) {
        return res.json({
          message: "Email đã tồn tại",
        });
      }
      const { encyptedPassword, salt } = hashPassword(password);
      connection.query(
        "INSERT INTO nguoidung (HoTen, SDT, Email, Password, salt, role) VALUES (?, ?, ?, ?, ?, ?)",
        [name, phone, email, encyptedPassword, salt, role],
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

authRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const sql = "Select * from nguoidung where Email =?";
  try {
    const user = await getOne({ db: connection, query: sql, params: email });
    if (!user) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const { encyptedPassword } = hashPasswordAlreadyHaveSalt(
      password,
      user.salt
    );
    if (user.Password !== encyptedPassword) {
      return res.status(401).json({
        message: "Sai mật khẩu",
      });
    } else {
      const token = jsonwebtoken.sign(
        {
          id: user.id,
          email: user.Email,
          role: user.role,
        },
        secret
      );
      return res.status(200).json({
        "login success": "true",
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

authRouter.get("/currentUser", authenticateToken, async function (req, res) {
  const { email } = req.user;
  const sql = "Select * from nguoidung where Email =?";
  try {
    const user = await getOne({ db: connection, query: sql, params: [email] });
    if (!user) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/sendEmail", async function (req, res) {
  const { emailTo, emailSubject, emailText } = req.body;
  try {
    mailService.sendEmail({
      emailFrom: process.env.SMTP_USER,
      emailTo,
      emailSubject,
      emailText,
    });
    return res.json({
      msg: "OK",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Không ok lắm he",
    });
  }
});

authRouter.post("/forgot-password", async function (req, res) {
  const { email } = req.body;
  const sql = "Select * from nguoidung where Email =?";
  try {
    const user = await getOne({ db: connection, query: sql, params: [email] });
    if (!user) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const token = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.Email,
        role: user.role,
      },
      secret,
      { expiresIn: "1h" }
    );
    const link = `http://localhost:3000/#/reset-password/${token}`;
    const emailText = `Click vào link này để reset password: ${link}`;
    mailService.sendEmail({
      emailFrom: process.env.SMTP_USER,
      emailTo: user.Email,
      emailSubject: "Reset password",
      emailText,
    });
    return res.status(200).json({
      message: "Vui lòng kiểm tra email để reset password",
    });
  } catch (error) {
    console.log(error);
  }
});
authRouter.post("/resetPassword", async function (req, res) {
  const { Email, newPassword } = req.body;
  const { encyptedPassword, salt } = hashPassword(newPassword);
  const sql = "UPDATE nguoidung SET Password = ?, salt = ? WHERE Email = ?";
  try {
    const user = await executeQuery({
      db: connection,
      query: sql,
      params: [encyptedPassword, salt, Email],
    });
    if (!user) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại",
      });
    }
    return res.status(200).json({
      message: "Thay đổi mật khẩu thành công",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = authRouter;
