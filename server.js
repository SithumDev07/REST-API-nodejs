const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");

const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welome to REST API" });
});

require("./app/routes/main.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
