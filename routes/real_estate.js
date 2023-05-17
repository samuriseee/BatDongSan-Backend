const express = require("express");
const real_estate_router = express.Router();
const connection = require("../database/connection");
const { executeQuery, getOne, create } = require("../database/query");
real_estate_router.get("/getAllBuyTypes", async (req, res) => {
  try {
    const allBuyTypes = await executeQuery({
      db: connection,
      query: "SELECT * from loaibds where BanHayChoThue = 1",
    });
    if (allBuyTypes) return res.json(allBuyTypes);
    return res.json({
      message: "Không có dữ liệu",
    });
  } catch (err) {
    return res.json({
      message: "Lỗi",
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
});

real_estate_router.post("/CreateNewRealEstate", async (req, res) => {
  const {
    LoaiBDS,
    DiaChi,
    TieuDe,
    DienTich,
    MucGia,
    DonVi,
    GiayToPhapLy,
    NoiThat,
    SoPhongTam,
    SoTang,
    SoPhongNgu,
    HuongNha,
    HuongBanCong,
    DuongVao,
    MatTien,
    HinhAnh,
    IDNguoiDung,
  } = req.body;
  console.log(req.body);
  try {
    const newRealEstate = await executeQuery({
      db: connection,
      query: `INSERT INTO batdongsan (LoaiBDS, DiaChi, TieuDe, DienTich, MucGia, DonVi, GiayToPhapLy, NoiThat, SoPhongTam, SoTang, SoPhongNgu, HuongNha, HuongBanCong, DuongVao, MatTien, HinhAnh) VALUES ('${LoaiBDS}', '${DiaChi}', '${TieuDe}', '${DienTich}', '${MucGia}', '${DonVi}', '${GiayToPhapLy}', '${NoiThat}', '${SoPhongTam}', '${SoTang}', '${SoPhongNgu}', '${HuongNha}', '${HuongBanCong}', '${DuongVao}', '${MatTien}', '${HinhAnh}')`,
    });
    if (newRealEstate) {
      const { insertId } = newRealEstate;
      const newPost = {
        IDbatDongSan: insertId,
        IDNguoiDung,
        TrangThai: "Chờ duyệt",
        NgayDang: null,
        NgayHetHan: null,
      };
      const execute = await executeQuery({
        db: connection,
        query: `INSERT INTO tindang (IDbatDongSan, IDNguoiDung,TrangThai,NgayDang,NgayHetHan) VALUES ('${newPost.IDbatDongSan}', '${newPost.IDNguoiDung}', "${newPost.TrangThai}", ${newPost.NgayDang}, ${newPost.NgayHetHan})`,
      });
      if (execute) {
        return res.status(200).json({
          message: "Tạo bài đăng thành công, Vui lòng đợi kiểm duyệt",
        });
      }
    }
    return res.json({
      message: "Không có dữ liệu",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to create new real estate entity");
  }
});

real_estate_router.get("/getBuyRealEstate", async (req, res) => {
  try {
    const buyRealEstate = await executeQuery({
      db: connection,
      query:
        "SELECT td.*, bds.*, lb.LoaiBDS,lb.BanHayChoThue,nd.HoTen, nd.SDT FROM TinDang td JOIN NguoiDung nd ON td.IDNguoiDung = nd.ID JOIN BatDongSan bds ON td.IDbatDongSan = bds.ID JOIN LoaiBDS lb ON bds.LoaiBDS = lb.ID WHERE lb.BanHayChoThue = 1;",
    });
    if (buyRealEstate) return res.json(buyRealEstate);
    return res.json({
      message: "Không có dữ liệu",
    });
  } catch (err) {
    return res.json({
      message: "Lỗi",
    });
  }
});
module.exports = real_estate_router;
