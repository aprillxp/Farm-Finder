if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors());
app.use(morgan("dev"));
app.use(router);

app.use(errorHandler);

module.exports = app