const express = require("express");
const router = require("./routes");
const app = express();
const cors = require('cors')

const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
}
app.use(express.json())
app.use(cors(corsOptions))

app.use("/api", router);

app.use((_, res, __) => {
  res.status(404).send({ message: "Not Found" });

});

module.exports = app;
