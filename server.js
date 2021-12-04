const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("dist"));
app.use("/css", express.static(__dirname + "dist/css"));

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const tutorials = await axios.get("http://localhost:8080/api/tutorials");
    console.log(tutorials.data);
    res.render("pages/index", { data: tutorials.data });
  } catch (err) {}
});

require("./app/routes/main.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
