const express = require("express");
const router = require("./routes");
const app = express();

app.use(express.json())

app.use("/api", router);

app.use((_, res, __) => {
  res.status(404).send({ message: "Not Found" });

});

module.exports = app;
