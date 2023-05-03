const connection = require("./connection");

connection.query(
  `CREATE TABLE if not exists ThanhPho (
      ID INT AUTO_INCREMENT PRIMARY KEY ,
      ThanhPho NVARCHAR(255)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table ThanhPho đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists QuanHuyen (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      QuanHuyen NVARCHAR(255),
      IDThanhPho INT,
      FOREIGN KEY (IDThanhPho) REFERENCES ThanhPho(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table QuanHuyen đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists PhuongXa (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      PhuongXa NVARCHAR(255),
      IDQuanHuyen INT,
      foreign key (IDQuanHuyen) references QuanHuyen(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table PhuongXa đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists Duong (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      Duong NVARCHAR(255),
      IDPhuongXa INT,
      FOREIGN KEY (IDPhuongXa) REFERENCES PhuongXa(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table Duong đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists DiaChiCuThe (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      DiaChi NVARCHAR(255),
      IDDuong INT,
      LinkGoogleMap LONGTEXT,
      FOREIGN KEY (IDDuong) REFERENCES Duong(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table DiaChiCuThe đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists LoaiBDS (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      LoaiBDS NVARCHAR(255),
      DacDiem NVARCHAR(255),
      DangThongTin NVARCHAR(20),
      BanHayChoThue BIT
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table LoaiBDS đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists BoPhan (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      BoPhan NVARCHAR(255)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table BoPhan đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists NhanVien (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      TenNhanVien NVARCHAR(255),
      MaBoPhan INT,
      SoDienThoai VARCHAR(20),
      Email VARCHAR(255),
      NgaySinh DATE,
      FOREIGN KEY(MaBoPhan) REFERENCES BoPhan(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table NhanVien đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists BatDongSan (
      ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      LoaiBDS INT,
      DiaChi TEXT,
      IDDiaChi INT,
      TieuDe TEXT,
      MoTa LONGTEXT,
      DienTich FLOAT,
      MucGia FLOAT,
      DonVi VARCHAR(20),
      GiayToPhapLy NVARCHAR(40),
      NoiThat NVARCHAR(150),
      SoPhongTam INT,
      SoTang INT,
      SoPhongNgu INT,
      HuongNha NVARCHAR(10),
      HuongBanCong NVARCHAR(10),
      DuongVao FLOAT,
      MatTien FLOAT,
      HinhAnh LONGTEXT,
      TrangThaiXacThuc bit,
      FOREIGN KEY (IDDiaChi) REFERENCES DiaChiCuThe(ID),
      FOREIGN KEY (LoaiBDS) REFERENCES LoaiBDS(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table BatDongSan đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists NguoiDung (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      HoTen NVARCHAR(255),
      MaSoThue VARCHAR(20),
      SDT VARCHAR(20),
      Email VARCHAR(255) NOT NULL UNIQUE,
      Password VARCHAR(255) NOT NULL UNIQUE,
      role nvarchar(20) NOT NULL,
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table NguoiDung đã được tạo!");
  }
);
connection.query(
  `CREATE TABLE if not exists TinDang (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      IDbatDongSan INT,
      IDNguoiDung INT,
      TrangThai NVARCHAR(20),
      NgayDang DATE,
      NgayHetHan DATE,
      FOREIGN KEY (IDbatDongSan) REFERENCES BatDongSan(ID),
      FOREIGN KEY (IDNguoiDung) REFERENCES NguoiDung(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table TinDang đã được tạo!");
  }
);
connection.query(
  `CREATE TABLE if not exists XacThucBDS (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      IDTinDang INT,
      TrangThai bit,
      NgayGuiYeuCau DATE,
      NgayTraKetQua DATE,
      HinhAnh VARCHAR(255),
      IDNhanVien INT,
      FOREIGN KEY (IDNhanVien) REFERENCES NhanVien(ID),
      FOREIGN KEY (IDTinDang) REFERENCES TinDang(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table XacThucBDS đã được tạo!");
  }
);

connection.query(
  `CREATE TABLE if not exists DatLich (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      IDNguoiDat INT,
      IDTinDang INT,
      NgayDatLich datetime,
      GioDatLich int,
      TrangThai bit,
      FOREIGN KEY (IDNguoiDat) REFERENCES NguoiDung(ID),
      FOREIGN KEY (IDTinDang) REFERENCES TinDang(ID)
    )`,
  (err, result) => {
    if (err) throw err;
    console.log("Table DatLich đã được tạo!");
  }
);
