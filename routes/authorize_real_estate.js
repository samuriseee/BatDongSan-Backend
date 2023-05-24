const express = require("express");
const authorize_real_estate_router = express.Router();
const connection = require("../database/connection");
const { executeQuery, getOne, create } = require("../database/query");

authorize_real_estate_router.post("/requestAuthorize", async (req, res) => {
  console.log(req.body);
  const { IDTinDang, TrangThai, NgayGuiYeuCau, NgayTraKetQua, HinhAnh } =
    req.body;
  try {
    const requestAuthorize = await executeQuery({
      db: connection,
      query: `INSERT INTO xacthucbds(IDTinDang,TrangThai,NgayGuiYeuCau,NgayTraKetQua,HinhAnh) VALUES(${IDTinDang},${TrangThai},${NgayGuiYeuCau},${NgayTraKetQua},'${HinhAnh}');`,
    });
    if (requestAuthorize) return res.status(200).json("Gửi yêu cầu thành công");
    return res.json({
      message: "Lỗi lúc yêu cầu",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Lỗi",
    });
  }
});

authorize_real_estate_router.get("/getAllAuthorizePost", async (req, res) => {
  try {
    const allAuthorizePost = await executeQuery({
      db: connection,
      query: `select * from xacthucbds
            inner join tindang on tindang.ID = xacthucbds.IDTinDang
            inner join batdongsan on batdongsan.ID = tindang.IDbatDongSan;
      `,
    });
    if (allAuthorizePost) return res.status(200).json(allAuthorizePost);
    return res.json({
      message: "Lỗi lúc lấy dữ liệu",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Lỗi",
    });
  }
});

authorize_real_estate_router.get(
  "/getAuthorizePostByID/:ID",
  async (req, res) => {
    const { ID } = req.params;
    try {
      const authorizePost = await executeQuery({
        db: connection,
        query: `SELECT tindang.*, xacthucbds.HinhAnh AS HinhAnhXacThuc, batdongsan.*
            from xacthucbds
            inner join tindang on tindang.ID = xacthucbds.IDTinDang
            inner join batdongsan on batdongsan.ID = tindang.IDbatDongSan
            where xacthucbds.ID = ${ID};
      `,
      });
      if (authorizePost) return res.status(200).json(authorizePost);
      return res.json({
        message: "Lỗi lúc lấy dữ liệu",
      });
    } catch (err) {
      console.log(err);
      return res.json({
        message: "Lỗi",
      });
    }
  }
);
module.exports = authorize_real_estate_router;
