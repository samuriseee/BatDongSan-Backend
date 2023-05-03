const express = require("express");
const user_router = require("./routes/user");
const auth_router = require("./routes/auth/index");
const cors = require("cors");
const connection = require("./database/connection");
require("dotenv").config();
const app = express();
PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.use("/user", user_router);
app.use("/auth", auth_router);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
