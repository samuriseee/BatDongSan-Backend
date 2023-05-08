const express = require("express");
const user_router = require("./routes/user");
const auth_router = require("./routes/auth/index");
const real_estate_router = require("./routes/real_estate");
const post_router = require("./routes/post");
const cors = require("cors");
require("dotenv").config();
const app = express();
PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/user", user_router);
app.use("/auth", auth_router);
app.use("/real_estate", real_estate_router);
app.use("/post", post_router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
