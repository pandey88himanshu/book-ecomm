const express = require("express");
const app = express();
require("./connection/connection");
require("dotenv").config();
const cors = require("cors");
const users = require("./routes/user");
const books = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const Order = require("./routes/order");
app.use(express.json());
app.use(cors());
//routes
app.use("/api/v1", users);
app.use("/api/v1", books);
app.use("/api/v1", favourite);
app.use("/api/v1", cart);
app.use("/api/v1", Order);
app.get("/", (req, res) => {
  res.send("Hello Form backend");
});
app.listen(process.env.PORT, () => {
  console.log(`port is ${process.env.PORT}`);
});
