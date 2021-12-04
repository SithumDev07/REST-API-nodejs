module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller");
  var router = require("express").Router();

  //* Create tutorial
  router.post("/", tutorials.create);

  //* FindAll
  router.get("/", tutorials.getAll);

  //* FindOne by ID
  router.get("/:id", tutorials.findByID);

  //* Update by ID
  router.put("/:id", tutorials.updateByID);

  app.use("/api/tutorials", router);
};
