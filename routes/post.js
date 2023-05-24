const express = require("express");
const post_router = express.Router();
const connection = require("../database/connection");
const { post } = require("./auth");

post_router.get("/getAllPost", (req, res) => {
  connection.query(
    "SELECT TinDang.TrangThai,TinDang.ID,TinDang.IDbatDongSan,TinDang.IDNguoiDung,TinDang.NgayDang,TinDang.ThanhPho,TinDang.QuanHuyen,TinDang.PhuongXa,BatDongSan.DienTich,BatDongSan.MucGia,BatDongSan.MoTa,BatDongSan.TieuDe,NguoiDung.HoTen FROM TinDang INNER JOIN BatDongSan ON TinDang.IDbatDongSan=BatDongSan.ID INNER JOIN NguoiDung ON TinDang.IDNguoiDung=NguoiDung.ID;",
    (err, rows) => {
      if (err) {
        // SELECT TinDang.ID,TinDang.IDbatDongSan,TinDang.IDNguoiDung,TinDang.NgayDang,BatDongSan.DiaChi,BatDongSan.DienTich,BatDongSan.MucGia,BatDongSan.MoTa,BatDongSan.TieuDe FROM TinDang INNER JOIN BatDongSan ON TinDang.IDbatDongSan=BatDongSan.ID;
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

// 4 trang thái
//tin chưa duyệt
post_router.get("/getPost_notApprovedYet", (req, res) => {
  connection.query(
    "SELECT TinDang.TrangThai,TinDang.ID,TinDang.IDbatDongSan,TinDang.IDNguoiDung,TinDang.NgayDang,TinDang.ThanhPho,TinDang.QuanHuyen,TinDang.PhuongXa,BatDongSan.DienTich,BatDongSan.MucGia,BatDongSan.MoTa,BatDongSan.TieuDe,NguoiDung.HoTen FROM TinDang INNER JOIN BatDongSan ON TinDang.IDbatDongSan=BatDongSan.ID INNER JOIN NguoiDung ON TinDang.IDNguoiDung=NguoiDung.ID where TinDang.TrangThai='chờ duyệt';",
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

// //tin không được duyệt
// post_router.get("/getPosts_not_approved", (req, res) => {
//   connection.query(
//     "SELECT TinDang.TrangThai,TinDang.ID,TinDang.IDbatDongSan,TinDang.IDNguoiDung,TinDang.NgayDang,TinDang.ThanhPho,TinDang.QuanHuyen,TinDang.PhuongXa,BatDongSan.DienTich,BatDongSan.MucGia,BatDongSan.MoTa,BatDongSan.TieuDe,NguoiDung.HoTen FROM TinDang INNER JOIN BatDongSan ON TinDang.IDbatDongSan=BatDongSan.ID INNER JOIN NguoiDung ON TinDang.IDNguoiDung=NguoiDung.ID where TinDang.TrangThai='không duyệt';",
//     (err, rows) => {
//       if (err) {
//         return res.json({
//           message: "Lỗi",
//         });
//       }
//       if (rows) {
//         return res.json(rows);
//       }
//     }
//   );
// });

//tin đã duyệt
post_router.get("/getPost_Approved", (req, res) => {
  connection.query(
    "SELECT TinDang.TrangThai,TinDang.ID,TinDang.IDbatDongSan,TinDang.IDNguoiDung,TinDang.NgayDang,TinDang.ThanhPho,TinDang.QuanHuyen,TinDang.PhuongXa,BatDongSan.DienTich,BatDongSan.MucGia,BatDongSan.MoTa,BatDongSan.TieuDe,NguoiDung.HoTen FROM TinDang INNER JOIN BatDongSan ON TinDang.IDbatDongSan=BatDongSan.ID INNER JOIN NguoiDung ON TinDang.IDNguoiDung=NguoiDung.ID where TinDang.TrangThai='đã duyệt';",
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

//tin vi phạm
post_router.get("/getPosts_violate", (req, res) => {
  connection.query(
    "SELECT TinDang.TrangThai,TinDang.ID,TinDang.IDbatDongSan,TinDang.IDNguoiDung,TinDang.NgayDang,TinDang.ThanhPho,TinDang.QuanHuyen,TinDang.PhuongXa,BatDongSan.DienTich,BatDongSan.MucGia,BatDongSan.MoTa,BatDongSan.TieuDe,NguoiDung.HoTen FROM TinDang INNER JOIN BatDongSan ON TinDang.IDbatDongSan=BatDongSan.ID INNER JOIN NguoiDung ON TinDang.IDNguoiDung=NguoiDung.ID where TinDang.TrangThai='vi phạm';",
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

// update trang thái thành đã duyệt
post_router.post("/updatePost_TrangThaiThanhDaDuyet", (req, res) => {
  const idU = req.body.idU;
  connection.query(
    "update TinDang set TrangThai = 'đã duyệt' where id =? ",
    [idU],
    (err) => {
      if (err) {
        return res.json({ message: "lỗi" });
      }
    }
  );
});

// update trang thái thành vi phạm
post_router.post("/updatePost_TrangThaiThanhViPham", (req, res) => {
  const idU = req.body.idU;
  connection.query(
    "update TinDang set TrangThai = 'vi phạm' where id =? ",
    [idU],
    (err) => {
      if (err) {
        return res.json({ message: "lỗi" });
      }
    }
  );
});

// //update trạng thái thành không được duyệt
// post_router.post("/updatePost_TrangThaiThanhKhongDuocDuyet", (req, res) => {
//   const idU = req.body.idU;
//   connection.query(
//     "update TinDang set TrangThai = 'không duyệt' where id =? ",
//     [idU],
//     (err) => {
//       if (err) {
//         return res.json({ message: "lỗi" });
//       }
//     }
//   );
// });

post_router.get("/PostDetail/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM TinDang INNER JOIN BatDongSan ON TinDang.IDbatDongSan=BatDongSan.ID  INNER JOIN NguoiDung ON TinDang.IDNguoiDung=NguoiDung.ID WHERE TinDang.ID = ?;",
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
module.exports = post_router;
