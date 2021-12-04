module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller");
  var router = require("express").Router();

  //* Create tutorial
  router.post("/", tutorials.create);

  //* FindAll
  router.get("/", tutorials.getAll);

  //* FindOne by ID
  router.get("/:id", tutorials.findByID);

  app.use("/api/tutorials", router);
};
