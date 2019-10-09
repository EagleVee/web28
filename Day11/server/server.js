const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const bookRouter = require("./api/modules/book/book.router");
const userRouter = require("./api/modules/user/user.router");
const moongoose = require("mongoose");
const config = require("./config");
moongoose.connect(config.mongoConnectString, { useNewUrlParser: true });

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);
app.use("/", express.static("client"));
app.use("/books", express.static("client/book.html"));

var server = app.listen(port, function() {
  console.log(`Server run at localhost:${port}`);
});
