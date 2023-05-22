const express = require("express");
const user_post_router = express.Router();
const connection = require("../database/connection");
const { executeQuery, getOne, create } = require("../database/query");

user_post_router.get(
  "/getRealEstatePostByUser/:IDNguoiDung",
  async (req, res) => {
    const IDNguoiDung = req.params.IDNguoiDung;
    try {
      const allRealEstatePost = await executeQuery({
        db: connection,
        query: `select * from tindang inner join batdongsan on tindang.IDbatDongSan = batdongsan.ID where tindang.IDNguoiDung = ${IDNguoiDung};`,
      });
      if (allRealEstatePost) return res.json(allRealEstatePost);
      return res.json({
        message: "Không có dữ liệu",
      });
    } catch (err) {
      console.log(err);
      return res.json({
        message: "Lỗi",
      });
    }
  }
);

module.exports = user_post_router;
